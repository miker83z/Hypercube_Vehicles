class Marker {
  constructor ({ name, duration }) {
    this.name = name
    this.duration = duration
  }

  get info () {
    return {
      name: this.name,
      duratino: this.duration
    }
  }

  set info ({ name, duration }) {
    this.name = name
    this.duration = duration
  }
}

export default Marker
