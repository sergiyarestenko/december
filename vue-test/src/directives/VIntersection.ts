export default {
  name: 'intersection',
  mounted(el: HTMLElement, binding: any) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries: any) => {
      // if (entries[0]?.isIntersecting && this.page < this.totalPages) {
      if (entries[0]?.isIntersecting) {
        binding.value()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  }
}
