import { HeadingTagName } from '@jsdevtools/rehype-toc';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type IntersectionObserverContext = [string | undefined];
const initialState: IntersectionObserverContext = [undefined];
const IntersectionObserverContext =
  createContext<IntersectionObserverContext>(initialState);

export function useIntersectionObserverContext() {
  return useContext(IntersectionObserverContext);
}

interface IntersectionObserverProviderProps {
  // rootElement: HTMLElement;
  // includesHeadingTagName: HeadingTagName[];
  children: ReactNode;
}

export default function IntersectionObserverProvider({
  // rootElement,
  // includesHeadingTagName,
  children,
}: IntersectionObserverProviderProps) {
  const [headingElements, setHeadingElements] = useState<Element[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | undefined>(
    undefined
  );

  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );

  useEffect(() => {
    const rootElement = document.getElementById('post-article');

    const tempHeadingElements = Array.from(
      (rootElement ?? document).querySelectorAll('h1, h2, h3, h4, h5, h6')
    );
    setHeadingElements([...tempHeadingElements]);

    const callback: IntersectionObserverCallback = (
      headings: IntersectionObserverEntry[]
    ) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveHeadingId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
          getIndexFromId(a.target.id) > getIndexFromId(b.target.id) ? 1 : -1
        );
        setActiveHeadingId(sortedVisibleHeadings[0].target.id);
      }
    };

    const rem = Number(
      window
        .getComputedStyle(document.documentElement)
        .fontSize.replace('px', '')
    );

    const observer: IntersectionObserver = new IntersectionObserver(callback, {
      // root: postContentElement,
      rootMargin: `${-(rem * 4)}px 0px 0px 0px`,
    });

    // const headingElements = Array.from(
    //   document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    // );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <IntersectionObserverContext.Provider value={[activeHeadingId]}>
      {children}
    </IntersectionObserverContext.Provider>
  );
}

export function useHeadingsData() {
  const [nestedHeadings, setNestedHeadings] = useState<Element[]>([]);

  useEffect(() => {
    const rootElement = document.getElementById('post-article');

    if (rootElement === null) {
      return;
    }
    const headingElements = Array.from(
      (rootElement ?? document).querySelectorAll('h1, h2, h3, h4, h5, h6')
    );

    // Created a list of headings, with H3s nested
    // const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings([...headingElements]);
  }, []);

  return { nestedHeadings };
}

export function useIntersectionObserver() {
  const [headingElements, setHeadingElements] = useState<Element[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string | undefined>(
    undefined
  );

  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );

  useEffect(() => {
    const rootElement = document.getElementById('post-article');

    if (rootElement === null) {
      return;
    }
    const tempHeadingElements = Array.from(
      (rootElement ?? document).querySelectorAll('h1, h2, h3, h4, h5, h6')
    );
    setHeadingElements([...tempHeadingElements]);
  }, []);

  useEffect(() => {
    if (headingElements.length === 0) {
      return;
    }

    const callback: IntersectionObserverCallback = (
      headings: IntersectionObserverEntry[]
    ) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveHeadingId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
          getIndexFromId(a.target.id) > getIndexFromId(b.target.id) ? 1 : -1
        );
        setActiveHeadingId(sortedVisibleHeadings[0].target.id);
      }
    };

    const rem = Number(
      window
        .getComputedStyle(document.documentElement)
        .fontSize.replace('px', '')
    );

    const observer: IntersectionObserver = new IntersectionObserver(callback, {
      // root: postContentElement,
      rootMargin: `${-(rem * 4)}px 0px 0px 0px`,
    });

    // const headingElements = Array.from(
    //   document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    // );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headingElements]);

  return { headingElements, activeHeadingId };
}
