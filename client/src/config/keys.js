if (process.env.NODE_ENV === "production") {
  module.exports = {
    url: "https://wormworm.herokuapp.com/"
  }
} else {
  module.exports = {
    url: "http://localhost:8000"
  }
}