document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // let textEditor = document.querySelector('.text-editor');
    let bolder = document.querySelector('#bolder');
    let italic = document.querySelector('#italic');
    let list = document.querySelector('#list');
    let textAreas = document.querySelectorAll('textarea.textarea');
    let exampleDiv = document.querySelector('.example');
    let show = (text) => {
        console.log(text);
    }
    let checkTags = (selected, allText, tagStart, tagEnd) => {
        // Изначальный поиск включает только выделенный текст, три строчки ниже берут на 3 символа до и на 4 после выделенной строки (основываясь на длине таких тэгов как <i> и <b>
        let startPosition = allText.indexOf(selected, 0);
        let endPosition = startPosition + selected.length;
        let extendedSelection = allText.slice(startPosition - tagStart.length, endPosition + tagEnd.length);
        //Если выделенный текст включает в себя тэги
        if (selected.includes(tagStart) && selected.includes(tagEnd)) {
            selected = selected.replace(tagStart, '');
            selected = selected.replace(tagEnd, '');
            return [selected, startPosition, endPosition];
        }
        // Если выделенный текст НЕ включает в себя тэги - ищем на три символа до и на 4 после выделенной строки
        else if (extendedSelection.includes(tagStart) && extendedSelection.includes(tagEnd)) {
            extendedSelection = extendedSelection.replace(tagStart, '');
            extendedSelection = extendedSelection.replace(tagEnd, '');
            return [extendedSelection, startPosition - tagStart.length, endPosition + tagEnd.length];
        }
        // Если выделенный текст включает только открывающий тэг - ищем закрывающий и удаляем оба
        else if (selected.includes(tagStart)) {
            let tagEndIndex = allText.indexOf(tagEnd, startPosition);
            selected = allText.slice(startPosition, tagEndIndex + tagEnd.length);
            selected = selected.replace(tagStart, '');
            selected = selected.replace(tagEnd,'');
            return [selected, startPosition, tagEndIndex + tagEnd.length];
        }
        // Если выделенный текст включает только закрывающий тэг - ищем открывающий и удаляем оба
        else if (selected.includes(tagEnd)) {
            let tagStartIndex = allText.lastIndexOf(tagStart, endPosition);
            selected = allText.slice(tagStartIndex - tagStart.length, endPosition);
            show(selected + ' - выбранный текст')
            selected = selected.replace(tagStart, '');
            selected = selected.replace(tagEnd, '');
            show(selected + ' - очищенный текст');
            return[selected,tagStartIndex - tagStart.length, endPosition];

        }
        // Если выделенный текст и расширенный текст не содержат в себе нужных тегов, пример <i><b>Пример</b></i>
        else {
            selected = `${tagStart}${selected}${tagEnd}`;
            return [selected, startPosition, endPosition];
        }
    }
    let selectedRangeCheck = (selStart, selEnd) => {
        return ((selStart + selEnd) !== 0 && selStart !== selEnd);
    }
    bolder.onclick = () => {
        for (let i = 0; i < textAreas.length; i++) {
            let tagStart = '<b>';
            let tagEnd = '</b>';
            let allText = textAreas[i].value;
            let selStart = textAreas[i].selectionStart;
            let selEnd = textAreas[i].selectionEnd;
            if (selectedRangeCheck(selStart, selEnd)) {
                let selText = textAreas[i].value.substring(selStart, selEnd);
                let dataArr = checkTags(selText, allText, tagStart, tagEnd);
                textAreas[i].setRangeText(dataArr[0], dataArr[1], dataArr[2], 'select');
            }
            exampleDiv.innerHTML = textAreas[i].value;
        }
    }
    italic.onclick = () => {
        for (let i = 0; i < textAreas.length; i++) {
            let tagStart = '<i>';
            let tagEnd = '</i>';
            let allText = textAreas[i].value;
            let selStart = textAreas[i].selectionStart;
            let selEnd = textAreas[i].selectionEnd;
            if (selectedRangeCheck(selStart, selEnd)) {
                let selText = textAreas[i].value.substring(selStart, selEnd);
                let dataArr = checkTags(selText, allText, tagStart, tagEnd);
                textAreas[i].setRangeText(dataArr[0], dataArr[1], dataArr[2], 'select');
            }
            exampleDiv.innerHTML = textAreas[i].value;
        }
    }
    list.onclick = () => {
        for (let i = 0; i < textAreas.length; i++) {
            let tagStart = '<ul><li>';
            let tagEnd = '</li></ul>';
            let allText = textAreas[i].value;
            let selStart = textAreas[i].selectionStart;
            let selEnd = textAreas[i].selectionEnd;
            if (selectedRangeCheck(selStart, selEnd)) {
                let selText = textAreas[i].value.substring(selStart, selEnd);
                let dataArr = checkTags(selText, allText, tagStart, tagEnd);
                textAreas[i].setRangeText(dataArr[0], dataArr[1], dataArr[2], 'select');
            }
        }
    }
    show('шото');
});