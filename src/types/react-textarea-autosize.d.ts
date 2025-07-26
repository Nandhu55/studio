
declare module 'react-textarea-autosize' {
    import * as React from 'react';
  
    export interface TextareaAutosizeProps
      extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
      minRows?: number;
      maxRows?: number;
      onHeightChange?: (height: number) => void;
      inputRef?: React.Ref<HTMLTextAreaElement>;
    }
  
    const TextareaAutosize: React.ForwardRefRenderFunction<
      HTMLTextAreaElement,
      TextareaAutosizeProps
    >;
  
    export default TextareaAutosize;
}
