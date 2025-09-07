import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Enable local storage for cropping functionality
    disableLocalStorage: false,

    // File type restrictions
    mimeTypes: ['image/*'],

    // Configure Sharp for image processing
    formatOptions: {
      format: 'webp',
      options: {
        quality: 90,
      },
    },

    // Resize options for original image
    resizeOptions: {
      width: 2400,
      height: 2400,
      fit: 'inside',
      withoutEnlargement: true,
    },

    // Enable focal point and cropping
    crop: true,
    focalPoint: true,
  },
}
