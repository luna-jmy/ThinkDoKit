<%*
const sourceType = tp.frontmatter.source_type;
const currentFile = tp.file.find_tfile(tp.file.title);

if (sourceType && currentFile) {
    let targetFolder = "";
    
    switch (sourceType) {
        case "articles":
            targetFolder = "300 Resources/350 Articles";
            break;
        case "references":
            targetFolder = "300 Resources/320 References";
            break;
        case "books":
            targetFolder = "300 Resources/330 Books";
            break;
        case "courses":
            targetFolder = "300 Resources/340 Courses";
            break;
        case "others":
            targetFolder = "300 Resources/360 OtherResources";
            break;
    }
    
    if (targetFolder) {
        await tp.file.move(targetFolder + "/" + tp.file.title);
    }
}
_%>