import _mapValues from 'lodash/mapValues';

function collectServerError(errors) {
    return _mapValues(errors, '0');
}

export default {
    data: () => ({
        processing: false,
        serverErrors: {},
        serverErrorMessage: null,
    }),

    methods: {
        async submit(form, send) {
            this.serverErrors = {};

            try {
                if (form.model) {
                    await form.validate();
                }

                const { data: response } = await send(form.model);

                this.$emit('saved', response);
            } catch (error) {
                if (error.response) {
                    this.handleError(error);
                }
            }
        },

        handleError(error) {
            if (error.response) {
                this.$message.error('Something went wrong. Please try again later.');

                if (error.response.status === 422) {
                    this.serverErrors = collectServerError(error.response.data.errors);
                }
            } else {
                throw error;
            }
        },

        resetForm(form) {
            if (form.model) {
                form.resetFields();
            }
        },
    },
};
