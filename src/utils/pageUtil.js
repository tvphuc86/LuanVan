import _ from 'lodash'
export const returnPaginationRange = (totalPage,page,limit,siblings) =>{
        let totalPageNoInArray = 7 + siblings;
        if(totalPageNoInArray>=totalPage){
            return _.range(1,totalPage+1)
        }
        let leftSiblingIndex = Math.max(page-siblings,1)
        let rightSiblingIndex = Math.min(page+siblings,totalPage)

        let showLeftDot = leftSiblingIndex > 2
        let showRightDot = rightSiblingIndex < totalPage-2

        if(!showLeftDot && showRightDot){
            let leftItemsCount = 3+2* siblings;
            let leftRange = _.range(1,leftItemsCount+1);
            return [...leftRange," ...",totalPage]
        }else if(showLeftDot && !showRightDot){
            let rightItemsCount = 3+2*siblings
            let rightRange = _.range(totalPage - rightItemsCount +1, totalPage+1)
            return [1, "... ", ...rightRange]
        }else{
            let middleRange = _.range(leftSiblingIndex,rightSiblingIndex+1)
            return [1,"... ",...middleRange," ...",totalPage]
        }
}