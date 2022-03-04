import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type ActiveHeadingContext = string[];
const initialState: ActiveHeadingContext = [];
const ActiveHeadingContext = createContext<ActiveHeadingContext>(initialState);

export function useActiveHeadingContext() {
  return useContext(ActiveHeadingContext);
}

interface Props {
  children: ReactNode;
}
export default function ActiveHeadingProvider({ children }: Props) {
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );

  useEffect(() => {
    let headingElements: HTMLElement[] = [];
    const postContentElement = document.getElementById('post-content');

    if (postContentElement) {
      headingElements = Array.from(
        postContentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
      );
    }
    // const tocLinkElements = document.querySelectorAll('.toc-item > a')

    function getIndexFromId(id: string) {
      return headingElements.findIndex(
        (headingElement) => headingElement.id === id
      );
    }
    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      headingElementsRef.current = entries.reduce((map, entry) => {
        map[entry.target.id] = entry;
        return map;
      }, headingElementsRef.current);

      // Object.keys(headingElementsRef.current).forEach((id: string) => {
      //   console.log(id, headingElementsRef.current[id].isIntersecting);
      // });

      const visibleHeadingElementsRef: IntersectionObserverEntry[] = [];

      Object.keys(headingElementsRef.current).forEach((key: string) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) {
          visibleHeadingElementsRef.push(headingElement);
        }
      });

      // console.log(visibleHeadingElementsRef)

      // tocLinkElementsRef.current = [...entries];

      // tocLinkElementsRef.curßrent.forEach((ref) => {});

      // const visibleHeadingElementsRef: IntersectionObserverEntry[] =
      //   tocLinkElementsRef.current.filter((ref) => {
      //     return ref.isIntersecting;
      //   });
      switch (true) {
        case visibleHeadingElementsRef.length === 0: {
          break;
        }
        case visibleHeadingElementsRef.length === 1: {
          setActiveHeadingId(visibleHeadingElementsRef[0].target.id);
          // const index = tocLinkElementsRef.current.indexOf(
          //   visibleHeadingElementsRef[0]
          // );
          // if (index) {
          //   setActiveHeadingId(tocLinkElementsRef.current[index - 1].target.id);
          // } else {
          //   setActiveHeadingId(tocLinkElementsRef.current[index].target.id);
          // }
          break;
        }
        case visibleHeadingElementsRef.length > 1: {
          const sortedVisibleHeadingElementsRef =
            visibleHeadingElementsRef.sort((a, b) => {
              switch (true) {
                case getIndexFromId(a.target.id) >
                  getIndexFromId(b.target.id): {
                  return 1;
                }
                case getIndexFromId(a.target.id) <
                  getIndexFromId(b.target.id): {
                  return -1;
                }
                default: {
                  return 0;
                }
              }
            });
          setActiveHeadingId(sortedVisibleHeadingElementsRef[0].target.id);
          // const index = tocLinkElementsRef.current.indexOf(
          //   sortedVisibleHeadingElementsRef[0]
          // );
          // if (index) {
          //   setActiveHeadingId(tocLinkElementsRef.current[index - 1].target.id);
          // } else {
          //   setActiveHeadingId(tocLinkElementsRef.current[index].target.id);
          // }
          break;
        }
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

    headingElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ActiveHeadingContext.Provider value={[activeHeadingId]}>
      {children}
    </ActiveHeadingContext.Provider>
  );
}
