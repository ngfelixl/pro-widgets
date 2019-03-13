module.exports = {
  name: 'pro-widgets',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/pro-widgets',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
