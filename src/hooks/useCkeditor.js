import { useMemo } from 'react';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';

const useEditorConfig = () => {
    const editorConfiguration = useMemo(() => ({
        plugins: [
            Bold,
            Italic,
            Underline,
            Heading,
            Link,
            List
        ],
        toolbar: [
            'heading',
            '|',
            'bold', 
            'italic', 
            'underline',
            '|',
            'link',
            'bulletedList', 
            'numberedList',
            '|',
            'undo', 
            'redo'
        ]
    }), []);

    return editorConfiguration;
};

export default useEditorConfig;
