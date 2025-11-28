import type { Core } from "../../modules/core";
import type { GlowColors } from "../types/interfaces";


/**
 * Animation methods
 */

function zoomIn(this: Core, duration: number = 600, scale: number = 1.2): Core {
  css.call(this, {
    'transform': `scale(${scale})`,
    'transition': `transform ${duration}ms ease-in-out`,
  });

  return this;
}

function zoomOut(this: Core, duration: number = 600): Core {
  css.call(this, {
    'transform': `scale(1)`,
    'transition': `transform ${duration}ms ease-in-out`,
  });

  return this;
}

function pulseGlow(this: Core, duration: number = 800, intensity: number = 20, colors: GlowColors = {
  boxShadow: 'rgba(91, 255, 15, 0.92)',
  textShadow: 'rgba(37, 185, 243, 0.86)',
  boxShadowPulse: 'rgba(30, 214, 205, 0.89)',
  textShadowPulse: 'rgba(33, 145, 236, 0.8)'
}): Core {
  const finalDuration: number = duration || 800;
  const finalIntensity: number = intensity || 20;

  const originalBoxShadow: string = css.call(this, 'box-shadow') as string || '';
  const originalTextShadow: string = css.call(this, 'text-shadow') as string || '';

  css.call(this, {
    'transition': `box-shadow ${finalDuration}ms ease-in-out, text-shadow ${finalDuration}ms ease-in-out`,
    'box-shadow': `0 0 ${finalIntensity}px ${colors.boxShadow}`,
    'text-shadow': `0 0 ${finalIntensity}px ${colors.textShadow}`,
  });

  const togglePulse: () => void = (): void => {
    css.call(this,{
      'box-shadow': `0 0 ${finalIntensity * 2}px ${colors.boxShadowPulse}`,
      'text-shadow': `0 0 ${finalIntensity * 2}px ${colors.textShadowPulse}`,
    });

    setTimeout(() => {
      css.call(this,{
        'box-shadow': originalBoxShadow,
        'text-shadow': originalTextShadow,
      });
    }, finalDuration / 2);
  };

  const pulseInterval: ReturnType<typeof setInterval> = setInterval(togglePulse, finalDuration);

  setTimeout(() => {
    clearInterval(pulseInterval);
    css.call(this,{
      'box-shadow': originalBoxShadow,
      'text-shadow': originalTextShadow,
    });
  }, finalDuration * 2);

  return this;
}

function pulse(this: Core, duration: number = 600, scale: number = 1.2): Core {
  const step: number = duration / 5;

  css.call(this,{
    'transition': `transform ${step}ms ease-out`,
    'transform': `scale(${scale})`
  });

  setTimeout(() => {
    css.call(this,'transform', 'scale(0.95)');
  }, step);

  setTimeout(() => {
    css.call(this,'transform', `scale(${scale * 0.98})`);
  }, step * 2);

  setTimeout(() => {
    css.call(this, 'transform', 'scale(1.01)');
  }, step * 3);

  setTimeout(() => {
    css.call(this, 'transform', 'scale(1)');
  }, step * 4);

  return this;
}

function bounce(this: Core, duration: number = 600, height: number = 30): Core {
  const step: number = duration / 6;

  css.call(this, {
    'transition': `transform ${step}ms ease-out`,
    'transform': `translateY(-${height}px) scaleY(1)`
  });

  setTimeout(() => {
    css.call(this, { 'transform': 'translateY(0) scaleY(0.9)' });
  }, step);

  setTimeout(() => {
    css.call(this, { 'transform': `translateY(-${height * 0.5}px) scaleY(1)` });
  }, step * 2);

  setTimeout(() => {
    css.call(this, { 'transform': 'translateY(0) scaleY(0.95)' });
  }, step * 3);

  setTimeout(() => {
    css.call(this, { 'transform': `translateY(-${height * 0.25}px) scaleY(1)` });
  }, step * 4);

  setTimeout(() => {
    css.call(this, { 'transform': 'translateY(0) scaleY(1)' });
  }, step * 5);

  return this;
}

function shake(this: Core, duration: number = 400, intensity: number = 1.5): Core {
  const keyframes: string[] = [
    `translateX(0)`,
    `translateX(-${intensity}px)`,
    `translateX(${intensity}px)`,
    `translateX(-${intensity}px)`,
    `translateX(${intensity}px)`,
    `translateX(0)`,
  ];

  const frameCount: number = keyframes.length;
  const startTime: number = performance.now();

  const animate: (now: number) => void = (now: number): void => {
    const elapsed: number = now - startTime;
    const progress: number = Math.min(elapsed / duration, 1);
    const frameIndex: number = Math.floor(progress * frameCount);

    if (frameIndex < frameCount) {
      css.call(this, { transform: keyframes[frameIndex] });
      requestAnimationFrame(animate);
    } else {
      css.call(this, { transform: 'none' });
    }
  };

  requestAnimationFrame(animate);

  return this;
}

function flip(this: Core, duration: number = 600): Core {
  const finalDuration:number = duration || 600;

  css.call(this, {
    'transform-style': 'preserve-3d',
    'transition': `transform ${finalDuration}ms ease-in-out`,
    'transform': 'rotateY(180deg)',
  });

  setTimeout(() => {
    css.call(this, { 'transform': 'rotateY(0deg)' });
  }, finalDuration);

  return this;
}

function slideDown(this: Core, duration: number = 400): Core {
  const finalDuration: number = duration || 400;

  // Set display to block and start from height 0 for sliding down effect
  css.call(this, {
    'display': 'block',
    'height': '0',
    'overflow': 'hidden',
    'transition': `height ${finalDuration}ms ease-out`
  });

  // Get the element's original height (height before it's hidden)
  const height: string = `${ this.elements[0].scrollHeight }px`;

  // Set height back to its full height to trigger the slide-down animation
  setTimeout(() => {
    css.call(this, {
      'height': height // Slide down to original height
    });
  }, 10); // Small timeout to trigger the transition

  return this;
}

function slideUp(this: Core, duration: number = 400): Core {
  const finalDuration: number = duration || 400;

  // Set the element's height to the current height for the animation to work
  css.call(this, {
    'transition': `height ${ finalDuration }ms ease-out`,
    'height': `${ this.elements[0].offsetHeight }px`, // Set initial height
    'overflow': 'hidden'
  });

  // Animate the height to 0 to hide the element
  setTimeout(() => {
    css.call(this, {
      'height': '0'
    });
  }, 10); // Small timeout to trigger the transition

  setTimeout(() => {
    css.call(this, 'display', 'none'); // Set display to none after the slide-up animation ends
  }, finalDuration);

  return this;
}

function slideYToggle(this: Core, duration: number = 400): Core {
  const isVisible: boolean = this.elements.some((el: HTMLElement) => getComputedStyle(el).display !== 'none');

  if (isVisible) {
    slideUp.call(this, duration);
  } else {
    slideDown.call(this, duration);
  }

  return this;
}

function slideLeft(this: Core, duration: number = 400): Core {
  css.call(this, {
    'transition': `transform ${ duration }ms ease-out, opacity ${ duration }ms ease-out`,
    'transform': 'translateX(-100%)',
    'opacity': '0'
  });

  setTimeout(() => {
    css.call(this, 'visibility', 'hidden');
  }, duration);

  return this;
}

function slideRight(this: Core, duration: number = 400): Core {

  css.call(this, {
    'visibility': 'visible',
    'transform': 'translateX(0%)',
    'transition': `transform ${ duration }ms ease-out, opacity ${ duration }ms ease-out`,
    'opacity': '1'
  });

  return this;
}

function slideXToggle(this: Core, duration: number = 400): Core {
  const isVisible: boolean = this.elements.some((el: HTMLElement) => {
    const style: CSSStyleDeclaration = getComputedStyle(el);
    const transform: string = style.transform;
    const opacity: number = parseFloat(style.opacity);
    const visibility: boolean = style.visibility !== 'hidden';
    return visibility && opacity > 0 && (transform === 'none' || transform.includes('matrix(1'));
  });

  if (isVisible) {
    slideLeft.call(this, duration);
  } else {
    slideRight.call(this, duration);
  }

  return this;
}

function fadeOut(this: Core, duration: number = 400, useVisibility: boolean = false): Core {
  const finalDuration: number = duration || 400;

  if (useVisibility) {
    css.call(this,
      {
        'transition': `opacity ${ finalDuration }ms ease-out`,
        'opacity': '0'
      }
    )
  } else {
    css.call(this,
      {
        'transition': `opacity ${ finalDuration }ms ease-out`,
        'opacity': '0',
      }
    )

    setTimeout(() => {
      css.call(this, 'display', 'none');
    }, finalDuration);
  }

  return this;
}

function fadeIn(this: Core, duration: number = 400, useVisibility: boolean = false): Core {
  const finalDuration: number = duration || 400;

  css.call(this, {
    'display': 'block',
    'opacity': '0',
    'transition': `opacity ${finalDuration}ms ease-out`
  });

  // Use visibility or fade-in by changing opacity
  if (useVisibility) {
    setTimeout(() => {
      css.call(this, {
        'visibility': 'visible',
        'opacity': '1'
      });
    }, 10); // Add a small delay to trigger the opacity transition
  } else {
    setTimeout(() => {
      css.call(this, {
        'opacity': '1' // Fade in by changing opacity
      });
    }, 10);
  }

  return this;
}

function fadeToggle(this: Core, duration: number = 400, useVisibility: boolean = false): Core {
  // Check the visibility of the selection as a whole (not individual elements)
  const isVisible: boolean = this.elements.some((el: HTMLElement) => getComputedStyle(el).opacity === '1');

  // Apply fadeOut or fadeIn depending on visibility of the selection
  if (isVisible) {
    fadeOut.call(this, duration, useVisibility);

  } else {
    fadeIn.call(this, duration, useVisibility);
  }

  return this;
}

function invisible(this: Core): Core {
  css.call(this, 'visibility', 'hidden');

  return this;
}

function hide(this: Core): Core {
  css.call(this, 'display', 'none');

  return this;
}

function show(this: Core): Core {
  css.call(this, 'display', '');

  return this;
}

function toggle(this: Core): Core {
  if (css.call(this, 'display') === 'none') {
    show.call(this);
  } else {
    hide.call(this);
  }

  return this;
}

function toggleVisibility(this: Core): Core {
  if (css.call(this, 'visibility') === 'hidden') {
    css.call(this, 'visibility', 'visible');
  } else {
    css.call(this, 'visibility', 'hidden');
  }

  return this;
}

function visible(this: Core): Core {
  css.call(this, 'visibility', 'visible');

  return this;
}

function css(
  this: Core,
  property: string | { [key: string]: string },
  value?: string,
  important: boolean | string = false): Core | string {
  if (typeof property === 'string' && value === undefined) {
    const computedStyle: CSSStyleDeclaration = getComputedStyle(this.elements[0]);
    return computedStyle.getPropertyValue(property);
  } else if (typeof property === 'string' && value !== undefined) {
    this.elements.forEach((el: HTMLElement) => {
      if (important) {
        el.style.setProperty(property, value, 'important');
      } else {
        el.style.setProperty(property, value);
      }
    });

    return this;
  } else if (typeof property === 'object') {
    this.elements.forEach((el: HTMLElement) => {
      for (const [key, value] of Object.entries(property)) {
        el.style.setProperty(key, value)
      }
    });

    return this;
  }

  return this;
}

export {
  zoomIn,
  zoomOut,
  pulseGlow,
  pulse,
  bounce,
  shake,
  flip,
  slideDown,
  slideUp,
  slideYToggle,
  slideLeft,
  slideRight,
  slideXToggle,
  fadeOut,
  fadeIn,
  fadeToggle,
  invisible,
  hide,
  show,
  toggle,
  toggleVisibility,
  visible,
  css
}
