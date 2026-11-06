export function pauseOtherPersonalMedia(current: HTMLMediaElement) {
  document
    .querySelectorAll<HTMLMediaElement>('[data-personal-message]')
    .forEach((media) => {
      if (media !== current) media.pause();
    });
}
