/**
 * @format
 */

export class Presentation {
  constructor({ key, id, title, currentSlideId, slides, wsExt }) {
    this.id = id;
    this.key = key;
    this.title = title;
    this.currentSlideId = currentSlideId;
    this.slides = slides;
    this.clients = []; // only server
    this.ext = wsExt; // only server
  }

  get() {
    return {
      id: this.id,
      key: this.key,
      title: this.title,
      currentSlideId: this.currentSlideId,
      slides: this.slides
    };
  }

  getSlide() {
    return this.slides.find(slide => {
      return slide.id === this.currentSlideId;
    });
  }
}
