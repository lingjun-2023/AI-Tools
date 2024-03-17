import ReactMarkdown from 'react-markdown';
import { toast } from 'react-hot-toast';
import copy from "copy-to-clipboard";
import { Clipboard } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface IProps {
    content: string;
}

export default function Markdown({ content }: IProps) {
    const handleCopy = (text: string) => {
        copy(text);
        toast.success("成功复制");
    }

    return (
        <ReactMarkdown
            components={{
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                        <div
                        className=' rounded-lg py-2'
                        >
                            <div className='flex w-full justify-between bg-white/5 p-2 rounded-t-md'>
                                <div className="text-sm">{match[0].split('-')[match[0].split('-').length - 1]}</div>
                                <button onClick={() => handleCopy(String(children).replace(/\n$/, ''))}>
                                    <Clipboard 
                                    className='text-white/20 hover:text-slate-300 w-4 h-4' />
                                </button>
                            </div>
                            <SyntaxHighlighter
                                language={match[1]}
                                style={vs2015}
                                customStyle={{padding:'12px',lineHeight:'1.5'}}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        </div>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
            }}
        >{content}</ReactMarkdown>
    )
}