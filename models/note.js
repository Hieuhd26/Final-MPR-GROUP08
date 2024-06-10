export default class Note {
  constructor(
    id,
    color,
    labelIds,
    content,
    updateAt,
    isBookmarked,
    folderId 
  ) {
    this.id = id;
    this.color = color;
    this.labelIds = labelIds;
    this.content = content;
    this.updateAt = updateAt;
    this.isBookmarked = isBookmarked;
    this.folderId = folderId;
  }
}
