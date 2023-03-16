export default{
    name: 'save',
    title: 'Save',
    type: 'document',
    fields: [
        {
            name: 'savedFrom',
            title: 'SavedFrom',
            type: 'savedFrom',
            weak: true,
        },
        {
            name: 'postId',
            title: 'PostId',
            type: 'string'
        },
    ]
}