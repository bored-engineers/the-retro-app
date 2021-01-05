import groupBy from 'lodash/groupBy';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

import { getBoardData } from './board.service';

import headerImage from '../assets/pdf-header';


const addCategoryData = (pdf: jsPDF & { lastAutoTable?: any; autoTable?: any; }, top: any, width: any, data: any) => {
    const rulerY = pdf.lastAutoTable.finalY + 5
    addHorizontalRuler(pdf, rulerY, width);

    let tableY = rulerY + 25;

    const groupedCategories = groupBy(data, 'category');
    Object.entries(groupedCategories).forEach(([category, categoryData]) => {
        pdf.text(category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), 17, tableY);
        pdf.autoTable({
            theme: 'plain',
            headStyles: { fillColor: '#546e7a', textColor: '#fff', fontStyle: 'bold' },
            tableWidth: width - 30,
            margin: { left: 15 },
            startY: tableY + 5,
            body: categoryData.reduce((acc, obj) => { acc.push([obj['text'], obj['votes']]); return acc; }, []),
            head: [{ text: 'Text', votes: 'Votes' }]
        });
        tableY = pdf.lastAutoTable.finalY + 25;
    });
}

const addBoardAdditionalInformation = (pdf: jsPDF & { autoTable?: any }, top: any, width: any, data: any) => {
    pdf.autoTable({
        theme: 'plain',
        headStyles: { fillColor: '#3f51b5', textColor: '#fff', fontStyle: 'bold' },
        tableWidth: width - 30,
        margin: { top, left: 15 },
        body: Object.entries(data),
        head: [{ name: 'Retro Information', '': '' }]
    })
}

const addHeaderImage = (pdf: jsPDF, width: number) => {
    pdf.addImage(headerImage, 'PNG', 15, 10, width - 30, 30, 'header-image', 'NONE');
}

const addBorder = (pdf: jsPDF, width: number, height: number) => {
    pdf.setLineWidth(1);
    pdf.rect(5, 5, width - 10, height - 10);
}

const addHorizontalRuler = (pdf: jsPDF, x1: number, width: number) => {
    pdf.line(15, x1, width - 15, x1);
}

const exportBoard = async (boardID: any) => {
    const boardData = await getBoardData(boardID);

    const pdf = new jsPDF({ unit: 'px', orientation: 'p', format: 'a4' });

    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();

    addHeaderImage(pdf, width);

    addHorizontalRuler(pdf, 50, width);

    addBoardAdditionalInformation(pdf, 60, width, { 'Board Id': boardID, 'Date': (new Date()).toDateString() });
    addCategoryData(pdf, 60, width, boardData.cards);

    const numberOfPages = pdf.getNumberOfPages();

    for (let pageNumber = 0; pageNumber < numberOfPages; pageNumber++) {
        pdf.setPage(pageNumber)
        addBorder(pdf, width, height);
    }

    pdf.save(`retro-meeting-${(new Date()).toDateString().toLowerCase().split(' ').join('-')}.pdf`);
}

export default exportBoard;
