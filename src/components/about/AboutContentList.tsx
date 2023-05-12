import { ReactElement, memo } from "react";

/**
 *  About content list
 */

interface IAboutContentList {
    title?: string;
    list: IAboutContentListItem[];
}

export interface IAboutContentListItem {
    boldText?: string;
    text?: string;
}


const ListItem = memo(({
    boldText,
    text
}: IAboutContentListItem): ReactElement =>
    <li className="mb-2">
        {boldText && <span className="fw-bold">{boldText}</span>} {text && text}
    </li>,
    (prevProps, nextProps) => {
        return prevProps.boldText === nextProps.boldText
            && prevProps.text === nextProps.text;
    }
);


const AboutContentList = ({
    title,
    list,
}: IAboutContentList): ReactElement => (
    <>
        {title && <p>{title}</p>}
        <ul>
            {list.map((item, i) =>
                <ListItem
                    key={i}
                    boldText={item.boldText}
                    text={item.text}
                />
            )}
        </ul>
    </>
);


export default AboutContentList;
