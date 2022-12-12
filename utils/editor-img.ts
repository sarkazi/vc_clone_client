class SimpleImage {
  render() {
    return document.createElement("input");
  }

  save(blockContent) {
    return {
      url: blockContent.value,
    };
  }
}
