function handleResize() {
  const width = window.innerWidth;

  let zoom = 1;
  if (width < 670) {
    const s = width / 670;
    zoom = Math.max(0.621, Math.min(s, 1));
  }
  1 === zoom
    ? document.getElementsByTagName("html")[0].style.removeProperty("zoom")
    : document.getElementsByTagName("html")[0].style.setProperty("zoom", zoom);
}

window.addEventListener("resize", handleResize);

handleResize();
