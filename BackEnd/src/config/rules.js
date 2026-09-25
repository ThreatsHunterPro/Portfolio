const rules = {
    contact: {
        nameMinLength: 2,
        nameMaxLength: 80,
        subjectMaxLength: 120,
        messageMinLength: 10,
        messageMaxLength: 3000,
        requestTypes: ['game', 'web', 'other'],
    },
};

export default rules;
