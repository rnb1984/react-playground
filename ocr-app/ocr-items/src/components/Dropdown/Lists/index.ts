import types from './types.json';
import { IDropDownValue } from '../index';


/**
 *  Dropdown Lists
*/
export const dropdownTypesList = () => {
    const ddList: IDropDownValue[] = createDropDownList(types.dairy, [{ value: "null", label: "Unknown" }]);
    return createDropDownList(types.meat, ddList);
};

const createDropDownList = (existingList: any[], ddList: IDropDownValue[]) => {
    existingList.forEach(item => {
        ddList.push(
            {
                value: item.value,
                label: item.label
            }
        )
    });
    return ddList;
}

/**
 * Time Type Lists
*/
interface ITimeTypeValue {
    label: string,
    value: number
}

export const timeTypeList = () => {
    const ttList: ITimeTypeValue[] = createTimeTypeList(types.dairy, [{ value: 0, label: "Unknown" }]);
    return createTimeTypeList(types.meat, ttList);
}

const createTimeTypeList = (existingList: any[], ttList: ITimeTypeValue[]) => {
    existingList.forEach(item => {
        ttList.push(
            {
                value: item.time,
                label: item.label
            }
        )
    });
    return ttList;
}


/**
 * Tag Type Lists
*/
interface ITagTypeValue {
    label: string,
    tags: string []
}

export const tagTypeList = () => {
    const ttList: ITagTypeValue[] = createTagTypeList(types.dairy, [{ tags: [""], label: "Unknown" }]);
    return createTagTypeList(types.meat, ttList);
}

const createTagTypeList = (existingList: any[], ttList: ITagTypeValue[]) => {
    existingList.forEach(item => {
        ttList.push(
            {
                tags: item.tags,
                label: item.label
            }
        )
    });
    return ttList;
}
