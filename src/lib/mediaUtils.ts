/**
 * Plays a media element safely by handling the promise returned by play().
 * This prevents the "Uncaught (in promise) AbortError" that occurs when
 * play() is interrupted by pause() or when the browser prevents autoplay.
 * 
 * @param mediaElement The HTMLAudioElement or HTMLVideoElement to play
 * @returns A promise that resolves when playback successfully starts
 */
export async function safePlay(mediaElement: HTMLMediaElement): Promise<void> {
  try {
    const playPromise = mediaElement.play();

    if (playPromise !== undefined) {
      await playPromise;
      // console.log('Media playback started successfully.');
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.warn('Media playback was interrupted by a pause() call or source change.');
    } else if (error.name === "NotAllowedError") {
      console.warn('Autoplay prevented by browser policy. Interaction required.');
    } else {
      console.error('Error attempting to play media:', error);
    }
    // We throw the error so the caller can still react if needed, 
    // but the console warning is more descriptive.
    throw error;
  }
}

/**
 * Pauses a media element safely.
 * @param mediaElement The HTMLAudioElement or HTMLVideoElement to pause
 */
export function safePause(mediaElement: HTMLMediaElement): void {
  if (!mediaElement.paused) {
    mediaElement.pause();
  }
}

/**
 * Toggles play/pause state safely.
 */
export async function toggleSafePlay(mediaElement: HTMLMediaElement): Promise<void> {
  if (mediaElement.paused) {
    await safePlay(mediaElement);
  } else {
    safePause(mediaElement);
  }
}
