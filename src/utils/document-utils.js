const DocumentUtils = {
  scrollToTop(params = {}) {
    const documentTop = document.querySelector('.AppNav');
    if (documentTop) {
      documentTop.scrollIntoView(params);
    }
  },
};

export default DocumentUtils;
