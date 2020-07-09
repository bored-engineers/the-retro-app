import jsPDF from 'jspdf'

const CATEGORIES_TITLE_MAP = new Map<any, any>()
        .set('went-well', 'What went well')
        .set('not-well', 'What didn\'t go well')
        .set('action-items', 'Action items')
        .set('appreciations', 'Appreciations');

const createCategoryData = (category:string, data:any): any => {
    let cardData = {
        category: '',
        text: [''],
    };
    for (let card of data){
        if(card.category===category){
            cardData.category=CATEGORIES_TITLE_MAP.get(card.category) ;
            cardData.text.push(card.text);
        }
    }
    return cardData;
}

const generatePDF = (data: any, boarID: any) => {
    var doc = new jsPDF(
        'p','mm', 'a4'
    );

    const wentWell = createCategoryData('went-well', data);
    const notWell = createCategoryData('not-well', data);
    const actionItems = createCategoryData('action-items', data);
    const appreciation = createCategoryData('appreciations', data);

    let y=50;
    var splitTitle='';
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var lineHeight = doc.getLineHeight()/doc.internal.scaleFactor;
    var lines=0;

    doc.setFillColor(52, 231, 207);
    doc.rect(0,0,pageWidth,20,'F');

    doc.setFontSize(6);
    doc.text(1,3, 'Bored Engineers presents');

    doc.setFontSize(30);
    doc.setFontStyle('bold');
    doc.text(75,15, 'The Reto App');

    var toDate = new Date().toString();
    var docName= `Retro-${toDate.substr(0,24).replace(':',"-")}`
    doc.setFontSize(12);
    doc.setFontStyle('normal');
    doc.text(20, 31,`Date: ${toDate.substr(0, 15)}`);
    doc.text(20, 37,`Board: ${boarID}`);
    doc.text(20, 42,`Team : Joker`);

    var blockHeight=8;
    doc.setFontStyle('normal');

    doc.setFontSize(15);
    doc.text(20,50,wentWell.category);
    for (let i=1; i<wentWell.text.length; i++){
        y=y+blockHeight;
        if(y>290){
            doc.addPage();
            y=10;
        }
        doc.setFontSize(10)
        splitTitle = doc.splitTextToSize(`- ${wentWell.text[i]}`, 180);
        lines = splitTitle.length;
        blockHeight = lines * lineHeight;
        blockHeight = blockHeight + 3;
        if((y+blockHeight)>295){
            doc.addPage();
            y=10;
        }
        doc.text(20,y,splitTitle);
    }


    y=y + blockHeight;
    doc.setFontSize(15);
    doc.text(20,y,notWell.category);
    for (let i=1; i<notWell.text.length; i++){
        if (i===1){
            y=y+8;
        }else{
        y=y+blockHeight;
        }
        if(y>290){
            doc.addPage();
            y=10;
        }

        doc.setFontSize(10);
        splitTitle = doc.splitTextToSize(`- ${notWell.text[i]}`, 180);
        lines = splitTitle.length;
        blockHeight = lines * lineHeight;
        blockHeight = blockHeight + 3;
        if((y+blockHeight)>295){
            doc.addPage();
            y=10;
        }
        doc.text(20,y,splitTitle);
    }

    y=y + blockHeight;
    doc.setFontSize(15);
    doc.text(20,y,actionItems.category);
    for (let i=1; i<actionItems.text.length; i++){
        if (i===1){
            y=y+8;
        }else{
        y=y+blockHeight;
        }
        if(y>290){
            doc.addPage();
            y=10;
        }
        doc.setFontSize(10)
        splitTitle = doc.splitTextToSize(`- ${actionItems.text[i]}`, 180);
        lines = splitTitle.length;
        blockHeight = lines * lineHeight;
        blockHeight = blockHeight + 3;
        if((y+blockHeight)>295){
            doc.addPage();
            y=10;
        }
        doc.text(20,y,splitTitle);
    }

    y=y + blockHeight;
    doc.setFontSize(15);
    doc.text(20,y,appreciation.category);
    for (let i=1; i<appreciation.text.length; i++){
        if (i===1){
            y=y+8;
        }else{
        y=y+blockHeight;
        }
        if(y>290){
            doc.addPage();
            y=10;
        }
        doc.setFontSize(10)
        splitTitle = doc.splitTextToSize(`- ${appreciation.text[i]}`, 180);
        lines = splitTitle.length;
        blockHeight = lines * lineHeight;
        blockHeight = blockHeight + 3;
        if((y+blockHeight)>295){
            doc.addPage();
            y=10;
        }
        doc.text(20,y,splitTitle);
    }
    doc.save(`${docName}.pdf`);

}
export {
    generatePDF
}