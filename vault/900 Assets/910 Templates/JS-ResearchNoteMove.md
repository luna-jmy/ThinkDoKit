---
created: 2025-09-18
---

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
            targetFolder = "300 Resources/330 Books/333 BookNotes";
            break;
        case "courses":
            targetFolder = "300 Resources/340 Notes";
            break;
        case "others":
            targetFolder = "300 Resources/390 EverythingElse";
            break;
    }
    
    if (targetFolder) {
        await tp.file.move(targetFolder + "/" + tp.file.title);
    }
}
_%>