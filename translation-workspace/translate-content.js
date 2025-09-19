const OpenAI = require('openai');
const fs = require('fs-extra');
const config = require('./config');
const chalk = require('chalk');

class ContentTranslator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openaiApiKey || process.env.OPENAI_API_KEY
    });
    this.translatedData = [];
  }

  async translateText(text, targetLanguage, context = '') {
    if (!text || text.trim() === '') return text;
    
    try {
      const prompt = `Translate the following ${context ? context + ' ' : ''}text from Slovenian to ${config.languageNames[targetLanguage]}. 
      
Maintain the original tone, style, and any technical terms. If there are brand names or specific technical terms, keep them unchanged.

Text to translate: "${text}"

Translated text:`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator specializing in business and technical content. Translate from Slovenian to ${config.languageNames[targetLanguage]} while preserving meaning, tone, and technical accuracy. Keep brand names, technical terms, and proper nouns unchanged unless they have established translations.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.3
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error(chalk.red(`❌ Translation error for "${text.substring(0, 50)}..."`), error.message);
      return text; // Return original text if translation fails
    }
  }

  async translateBlock(block, targetLanguage) {
    const translatedBlock = {
      ...block,
      translatable: {}
    };

    console.log(chalk.cyan(`    Translating ${block.blockType} block...`));

    switch (block.blockType) {
      case 'simplePage':
        translatedBlock.translatable = {
          title: await this.translateText(block.translatable.title, targetLanguage, 'page title'),
          subtitle: await this.translateText(block.translatable.subtitle, targetLanguage, 'subtitle'),
          content: await this.translateText(block.translatable.content, targetLanguage, 'page content')
        };
        break;

      case 'hero':
        translatedBlock.translatable = {
          title: await this.translateText(block.translatable.title, targetLanguage, 'hero title'),
          subtitle: await this.translateText(block.translatable.subtitle, targetLanguage, 'hero subtitle'),
          description: await this.translateText(block.translatable.description, targetLanguage, 'hero description')
        };
        break;

      case 'features':
        translatedBlock.translatable = {
          title: await this.translateText(block.translatable.title, targetLanguage, 'features section title'),
          subtitle: await this.translateText(block.translatable.subtitle, targetLanguage, 'features section subtitle'),
          features: []
        };
        
        for (const feature of block.translatable.features || []) {
          translatedBlock.translatable.features.push({
            title: await this.translateText(feature.title, targetLanguage, 'feature title'),
            description: await this.translateText(feature.description, targetLanguage, 'feature description')
          });
        }
        break;

      case 'testimonials':
        translatedBlock.translatable = {
          title: await this.translateText(block.translatable.title, targetLanguage, 'testimonials section title'),
          testimonials: []
        };
        
        for (const testimonial of block.translatable.testimonials || []) {
          translatedBlock.translatable.testimonials.push({
            quote: await this.translateText(testimonial.quote, targetLanguage, 'testimonial quote'),
            author: testimonial.author, // Names usually don't need translation
            position: await this.translateText(testimonial.position, targetLanguage, 'job position'),
            company: testimonial.company // Company names usually don't need translation
          });
        }
        break;

      case 'faq':
        translatedBlock.translatable = {
          title: await this.translateText(block.translatable.title, targetLanguage, 'FAQ section title'),
          faqs: []
        };
        
        for (const faq of block.translatable.faqs || []) {
          translatedBlock.translatable.faqs.push({
            question: await this.translateText(faq.question, targetLanguage, 'FAQ question'),
            answer: await this.translateText(faq.answer, targetLanguage, 'FAQ answer')
          });
        }
        break;

      default:
        // Generic translation for unknown block types
        for (const [key, value] of Object.entries(block.translatable)) {
          if (typeof value === 'string') {
            translatedBlock.translatable[key] = await this.translateText(value, targetLanguage, key);
          } else {
            translatedBlock.translatable[key] = value;
          }
        }
    }

    // Small delay between API calls
    await new Promise(resolve => setTimeout(resolve, 500));

    return translatedBlock;
  }

  async translatePage(pageData, targetLanguage) {
    console.log(chalk.blue(`  🌍 Translating to ${config.languageNames[targetLanguage]}...`));

    const translatedPage = {
      ...pageData,
      targetLanguage,
      translations: {
        title: await this.translateText(pageData.title, targetLanguage, 'page title'),
        meta: {
          title: await this.translateText(pageData.meta.title, targetLanguage, 'SEO title'),
          description: await this.translateText(pageData.meta.description, targetLanguage, 'SEO description')
        },
        blocks: []
      }
    };

    // Translate each block
    for (const block of pageData.blocks) {
      const translatedBlock = await this.translateBlock(block, targetLanguage);
      translatedPage.translations.blocks.push(translatedBlock);
    }

    return translatedPage;
  }

  async run() {
    try {
      console.log(chalk.blue('🔄 Starting translation process...'));

      // Load source data
      const sourceData = await fs.readJson('./data/pages-source.json');
      console.log(chalk.green(`📖 Loaded ${sourceData.length} pages from source data`));

      // Filter pages that need translation
      const pagesToTranslate = sourceData.filter(page => page.needsTranslation.length > 0);
      console.log(chalk.yellow(`🎯 ${pagesToTranslate.length} pages need translation`));

      if (pagesToTranslate.length === 0) {
        console.log(chalk.green('🎉 All pages are already translated!'));
        return;
      }

      // Process each page
      for (let i = 0; i < pagesToTranslate.length; i++) {
        const page = pagesToTranslate[i];
        console.log(chalk.cyan(`\n📄 [${i + 1}/${pagesToTranslate.length}] Processing: ${page.title}`));

        const pageTranslations = {
          ...page,
          languageVersions: {}
        };

        // Translate to each needed language
        for (const targetLanguage of page.needsTranslation) {
          try {
            const translatedPage = await this.translatePage(page, targetLanguage);
            pageTranslations.languageVersions[targetLanguage] = translatedPage.translations;
            
            console.log(chalk.green(`    ✅ ${config.languageNames[targetLanguage]} completed`));
          } catch (error) {
            console.error(chalk.red(`    ❌ Failed to translate to ${targetLanguage}:`), error.message);
            pageTranslations.languageVersions[targetLanguage] = null;
          }
        }

        this.translatedData.push(pageTranslations);

        // Progress update
        const progress = Math.round(((i + 1) / pagesToTranslate.length) * 100);
        console.log(chalk.blue(`📊 Progress: ${progress}% (${i + 1}/${pagesToTranslate.length})`));

        // Batch delay
        if ((i + 1) % config.batchSize === 0) {
          console.log(chalk.yellow('⏳ Batch completed, taking a short break...'));
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      // Save translated data
      await fs.ensureDir('./data');
      await fs.writeJson('./data/pages-translated.json', this.translatedData, { spaces: 2 });

      console.log(chalk.green(`\n🎉 Translation completed!`));
      console.log(chalk.blue(`📁 Translated data saved to: ./data/pages-translated.json`));

      // Summary
      const totalTranslations = this.translatedData.reduce((sum, page) => {
        return sum + Object.keys(page.languageVersions).length;
      }, 0);

      console.log(chalk.yellow(`\n📊 Translation Summary:`));
      console.log(chalk.yellow(`   - Pages processed: ${this.translatedData.length}`));
      console.log(chalk.yellow(`   - Total translations: ${totalTranslations}`));
      console.log(chalk.yellow(`   - Languages: ${config.targetLocales.join(', ')}`));

      return this.translatedData;

    } catch (error) {
      console.error(chalk.red('\n❌ Fatal error during translation:'), error.message);
      
      // Save partial results if any
      if (this.translatedData.length > 0) {
        await fs.writeJson('./data/pages-translated-partial.json', this.translatedData, { spaces: 2 });
        console.log(chalk.yellow('💾 Partial results saved to: ./data/pages-translated-partial.json'));
      }
      
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const translator = new ContentTranslator();
  translator.run();
}

module.exports = ContentTranslator;
