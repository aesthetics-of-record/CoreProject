import {useState} from "react";

/**
 * 탭 기능을 위한 hook
 * @param {number} initialTab
 * @param {Array.<object>} allTabs
 * @returns {{ currentItem: number, changeItem: (value: unknown) => void}}
 */
export const useTabs = (initialTab, allTabs) => {
    const [currentIndex, setCurrentIndex] = useState(initialTab);
    if (!allTabs || !Array.isArray(allTabs)) {
        return;
    }
    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex,
    };
};
