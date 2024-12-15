import * as React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'la-decorate-terms': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & { "popup-definitions": boolean, "link-terms": boolean },
                HTMLElement
            >;
            'la-decorate-internal-refs': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & { "popups": boolean, "flag": boolean },
                HTMLElement
            >;
            'la-akoma-ntoso': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement> & { "frbr-expression-uri": string },
                HTMLElement
            >;
        }
    }
  }