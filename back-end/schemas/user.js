export default{
    name: 'user',
    title: 'User',
    type: 'document',
    liveEdit: true,
    fields: [
        {
            name: 'userName',
            title: 'UserName',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'string'
        },
        {
            name: 'save',
            title: 'Save',
            type: 'array',
            of: [{ type: 'save' }]
        },
    ]
}