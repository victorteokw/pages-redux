import {createPageReducer, createSetPagePropsAction, createReplacePagePropsAction} from './src';
import assert from 'assert';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';

suite('pages-redux', function() {

  var root, reducer;

  beforeEach(function() {
    root = {
      key: 'column',
      page: 'ColumnPage',
      props: {
        childPages: [
          {
            key: 'camera',
            page: 'CameraPage',
            props: {
              flash: true,
              HDR: false,
              aperture: 1.8,
              shutterSpeed: 0.01,
              ISO: 200
            }
          },
          {
            key: 'photos',
            page: 'PhotosListPage',
            props: {
              showVideos: true,
              showPhotos: true,
              showEditButton: false,
              childPages: [
                {
                  key: 'preview0026',
                  page: 'PhotoPreviewPage',
                  props: {
                    fileName: 'image0026.jpg',
                    scale: 1.7,
                    offset: {
                      x: 0.2,
                      y: 0.5
                    }
                  }
                },
                {
                  key: 'editing0028',
                  page: 'PhotoEditorPage',
                  props: {
                    childPages: [
                      {
                        key: 'editingTools0028',
                        page: 'EditingToolsPage',
                        props: {
                          disabledTools: ['eraser']
                        }
                      },
                      {
                        key: 'historyTracking',
                        page: 'HistoryTrackingPage',
                        props: {}
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            key: 'printService',
            page: 'PrintServicePage',
            props: {
              userId: 12605,
              userCity: 'Los Angeles',
              available: true
            }
          }
        ]
      }
    };
    reducer = createPageReducer({});
  });

  test('createPageReducer should create a correct page reducer', function() {
    let state = reducer(root, {type: 'NOT_DEFINED'});
    assert.deepEqual(state, root);
  });

  test('not do anything if the first path component doesn\'t imply this group.', function() {
    let state = reducer(root, createSetPagePropsAction(['row', 'ab'], {
      a:1, b:2
    }));
    assert.deepEqual(state, root);
  });

  test('should set a page props if path is correct.', function() {
    let state = reducer(root, createSetPagePropsAction(['column', 'camera'], {
      flash: false
    }));
    let expect = {
      key: 'column',
      page: 'ColumnPage',
      props: {
        childPages: [
          {
            key: 'camera',
            page: 'CameraPage',
            props: {
              flash: false,
              HDR: false,
              aperture: 1.8,
              shutterSpeed: 0.01,
              ISO: 200
            }
          },
          {
            key: 'photos',
            page: 'PhotosListPage',
            props: {
              showVideos: true,
              showPhotos: true,
              showEditButton: false,
              childPages: [
                {
                  key: 'preview0026',
                  page: 'PhotoPreviewPage',
                  props: {
                    fileName: 'image0026.jpg',
                    scale: 1.7,
                    offset: {
                      x: 0.2,
                      y: 0.5
                    }
                  }
                },
                {
                  key: 'editing0028',
                  page: 'PhotoEditorPage',
                  props: {
                    childPages: [
                      {
                        key: 'editingTools0028',
                        page: 'EditingToolsPage',
                        props: {
                          disabledTools: ['eraser']
                        }
                      },
                      {
                        key: 'historyTracking',
                        page: 'HistoryTrackingPage',
                        props: {}
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            key: 'printService',
            page: 'PrintServicePage',
            props: {
              userId: 12605,
              userCity: 'Los Angeles',
              available: true
            }
          }
        ]
      }
    };
    assert.deepEqual(state, expect);
  });

  test('should set a deep nested page if path is correct.', function() {
    let state = reducer(root, createSetPagePropsAction(['column', 'photos', 'preview0026'], {
      doNotEdit: true,
      scale: 5.0
    }));
    let expect = {
      key: 'column',
      page: 'ColumnPage',
      props: {
        childPages: [
          {
            key: 'camera',
            page: 'CameraPage',
            props: {
              flash: true,
              HDR: false,
              aperture: 1.8,
              shutterSpeed: 0.01,
              ISO: 200
            }
          },
          {
            key: 'photos',
            page: 'PhotosListPage',
            props: {
              showVideos: true,
              showPhotos: true,
              showEditButton: false,
              childPages: [
                {
                  key: 'preview0026',
                  page: 'PhotoPreviewPage',
                  props: {
                    fileName: 'image0026.jpg',
                    scale: 5.0,
                    offset: {
                      x: 0.2,
                      y: 0.5
                    },
                    doNotEdit: true
                  }
                },
                {
                  key: 'editing0028',
                  page: 'PhotoEditorPage',
                  props: {
                    childPages: [
                      {
                        key: 'editingTools0028',
                        page: 'EditingToolsPage',
                        props: {
                          disabledTools: ['eraser']
                        }
                      },
                      {
                        key: 'historyTracking',
                        page: 'HistoryTrackingPage',
                        props: {}
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            key: 'printService',
            page: 'PrintServicePage',
            props: {
              userId: 12605,
              userCity: 'Los Angeles',
              available: true
            }
          }
        ]
      }
    };
    assert.deepEqual(state, expect);
  });

  test('should replace a deep nested page if path is correct.', function() {
    let state = reducer(root, createReplacePagePropsAction(['column', 'photos', 'preview0026'], {
      doNotEdit: true,
      scale: 5.0
    }));
    let expect = {
      key: 'column',
      page: 'ColumnPage',
      props: {
        childPages: [
          {
            key: 'camera',
            page: 'CameraPage',
            props: {
              flash: true,
              HDR: false,
              aperture: 1.8,
              shutterSpeed: 0.01,
              ISO: 200
            }
          },
          {
            key: 'photos',
            page: 'PhotosListPage',
            props: {
              showVideos: true,
              showPhotos: true,
              showEditButton: false,
              childPages: [
                {
                  key: 'preview0026',
                  page: 'PhotoPreviewPage',
                  props: {
                    scale: 5.0,
                    doNotEdit: true
                  }
                },
                {
                  key: 'editing0028',
                  page: 'PhotoEditorPage',
                  props: {
                    childPages: [
                      {
                        key: 'editingTools0028',
                        page: 'EditingToolsPage',
                        props: {
                          disabledTools: ['eraser']
                        }
                      },
                      {
                        key: 'historyTracking',
                        page: 'HistoryTrackingPage',
                        props: {}
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            key: 'printService',
            page: 'PrintServicePage',
            props: {
              userId: 12605,
              userCity: 'Los Angeles',
              available: true
            }
          }
        ]
      }
    };
    assert.deepEqual(state, expect);
  });

  test('should overwrite childPages.', function() {
    let state = reducer(root, createReplacePagePropsAction(['column', 'photos'], {
      showVideos: false
    }));
    let expect = {
      key: 'column',
      page: 'ColumnPage',
      props: {
        childPages: [
          {
            key: 'camera',
            page: 'CameraPage',
            props: {
              flash: true,
              HDR: false,
              aperture: 1.8,
              shutterSpeed: 0.01,
              ISO: 200
            }
          },
          {
            key: 'photos',
            page: 'PhotosListPage',
            props: {
              showVideos: false
            }
          },
          {
            key: 'printService',
            page: 'PrintServicePage',
            props: {
              userId: 12605,
              userCity: 'Los Angeles',
              available: true
            }
          }
        ]
      }
    };
    assert.deepEqual(state, expect);
  });

  test('should throw error if path is wrong.', function() {
    assert.throws(() => {
      let state = reducer(root, createSetPagePropsAction(['column', 'not-exist'], {
        a:1, b:2
      }));
    }, /No child page descriptor with key 'not-exist' at path 'not-exist'\./);
  });
});