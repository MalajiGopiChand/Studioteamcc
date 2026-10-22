import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { brand, films } from '../data/content';

export const playableFilms = films.filter(film => typeof film.src === 'string' && film.src.trim());

export function FilmPlayer({ film }) {
  const video = useRef(null);
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const element = video.current;
    if (!element || failed) return;
    let visible = false;
    let manuallyPaused = false;
    let automaticPause = false;
    const pause = () => {
      if (!element.paused) { automaticPause = true; element.pause(); }
    };
    const play = () => {
      if (!reduceMotion && !manuallyPaused && !document.hidden && visible) {
        element.muted = true;
        element.play().catch(() => {});
      }
    };
    const onPause = () => {
      if (automaticPause) automaticPause = false;
      else manuallyPaused = true;
    };
    const onPlay = () => { manuallyPaused = false; };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .55;
      if (visible) play(); else pause();
    }, { threshold: [0, .55, 1] });
    const onVisibility = () => document.hidden ? pause() : play();
    observer.observe(element);
    element.addEventListener('pause', onPause);
    element.addEventListener('play', onPlay);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      element.removeEventListener('pause', onPause);
      element.removeEventListener('play', onPlay);
      element.pause();
    };
  }, [film.src, reduceMotion, failed]);
  return <article className={`native-film ${film.orientation === 'landscape' ? 'landscape' : ''}`}>
    {failed ? <div className="film-error" role="status"><p>This film is temporarily unavailable.</p><a href={`${brand.whatsapp}?text=${encodeURIComponent(`Hello, I'd like to watch ${film.title}.`)}`} target="_blank" rel="noreferrer">Ask the studio <ArrowUpRight size={14}/></a></div> : <video
      ref={video}
      src={film.src}
      poster={film.poster || undefined}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={film.title}
      onError={() => setFailed(true)}
    >{film.captions && <track kind="captions" src={film.captions} srcLang="en" label="English"/>}</video>}
  </article>;
}

export function FilmAvailability() {
  return <div className="film-availability">
    <span className="availability-mark" aria-hidden="true">S<span> / </span>CC</span>
    <p className="availability-label">THE FILM COLLECTION</p>
    <h2>A little more<br/><em>to look forward to.</em></h2>
    <p>Our films will be available here soon.<br/>Get in touch to explore our wedding filmmaking.</p>
    <Link className="button light" to="/contact">Enquire About Your Film <ArrowUpRight size={15}/></Link>
  </div>;
}
