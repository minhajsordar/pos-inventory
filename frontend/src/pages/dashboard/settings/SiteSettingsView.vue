<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="q-gutter-y-md site-settings-tabs" style="max-width: 600px">
                <q-card>
                    <q-card-section class="!p-0">
                        <q-tabs v-model="tab" dense class="text-grey" active-color="black" indicator-color="black"
                            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'" align="left" shrink stretch
                            narrow-indicator>
                            <q-tab name="details" label="Details" />
                            <q-tab name="pos" label="Pos" />
                            <q-tab name="report" label="Report" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="tab" animated>
                            <q-tab-panel name="details">
                                <div class="flex -m-2">
                                    <div class="p-2 w-full">
                                        <q-input label="title *" type="text" placeholder="title"
                                            v-model="formDataLists.title" outlined dense />
                                        <div v-if="formErrors?.title" class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.title }}</span>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <q-input label="description *" type="textarea" placeholder="description"
                                            v-model="formDataLists.description" outlined dense />
                                        <div v-if="formErrors?.description" class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.description }}</span>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>

                            <q-tab-panel name="pos">
                                <div class="flex -m-2">
                                    <div class="p-2 w-full">
                                        <q-file label="pos_header_image *" placeholder="pos_header_image"
                                            v-model="formDataLists.pos_header_image" outlined dense />
                                        <div v-if="formErrors?.pos_header_image" class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.pos_header_image }}</span>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <q-input label="pos_header_image_width *" type="number"
                                            placeholder="pos_header_image_width"
                                            v-model="formDataLists.pos_header_image_width" outlined dense />
                                        <div v-if="formErrors?.pos_header_image_width"
                                            class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.pos_header_image_width }}</span>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <q-input label="pos_header_image_height *" type="number"
                                            placeholder="pos_header_image_height"
                                            v-model="formDataLists.pos_header_image_height" outlined dense />
                                        <div v-if="formErrors?.pos_header_image_height"
                                            class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.pos_header_image_height }}</span>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <q-input label="pos_header *" type="textarea" placeholder="pos_header"
                                            v-model="formDataLists.pos_header" outlined dense />
                                        <div v-if="formErrors?.pos_header" class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.pos_header }}</span>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <q-input label="pos_footer *" type="textarea" placeholder="pos_footer"
                                            v-model="formDataLists.pos_footer" outlined dense />
                                        <div v-if="formErrors?.pos_footer" class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.pos_footer }}</span>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>

                            <q-tab-panel name="report">
                                <div class="flex -m-2">

                                    <div class="p-2 w-full">
                                        <q-file label="report_header_image *" placeholder="report_header_image"
                                            v-model="formDataLists.report_header_image" outlined dense />
                                        <div v-if="formErrors?.report_header_image" class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.report_header_image }}</span>
                                        </div>
                                    </div>

                                    <div class="p-2 w-full">
                                        <q-input label="report_header_image_width *" type="number"
                                            placeholder="report_header_image_width"
                                            v-model="formDataLists.report_header_image_width" outlined dense />
                                        <div v-if="formErrors?.report_header_image_width"
                                            class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.report_header_image_width }}</span>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <q-input label="report_header_image_height *" type="number"
                                            placeholder="report_header_image_height"
                                            v-model="formDataLists.report_header_image_height" outlined dense />
                                        <div v-if="formErrors?.report_header_image_height"
                                            class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.report_header_image_height }}</span>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <q-input label="report_header *" type="textarea" placeholder="report_header"
                                            v-model="formDataLists.report_header" outlined dense />
                                        <div v-if="formErrors?.report_header" class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.report_header }}</span>
                                        </div>
                                    </div>
                                    <div class="p-2 w-full">
                                        <q-input label="report_footer *" type="textarea" placeholder="report_footer"
                                            v-model="formDataLists.report_footer" outlined dense />
                                        <div v-if="formErrors?.report_footer" class="text-red-8 text-xs q-pl-sm">
                                            <span>{{ formErrors?.report_footer }}</span>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-card-section>
                    <q-card-section class="!pt-0">
                        <q-btn label="Update" color="primary" @click="updateSettings" />
                    </q-card-section>
                </q-card>

            </div>
        </div>
    </q-page>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { onMounted, ref, reactive } from 'vue';
import { api, backendUrlLink } from '@/boot/axios';
import { useRoute, useRouter } from 'vue-router';
import { getToken } from '@/utils/token';
import { useUserAuthStore } from '@/stores/userAuthStore.js';
const route = useRoute();
const router = useRouter();
const tab = ref('details');
const $q = useQuasar()
const formErrors = ref({});
const formDataLists = reactive({
    title: '',
    description: '',
    pos_header_image: '',
    pos_header_image_width: 0,
    pos_header_image_height: 0,
    pos_header: '',
    pos_footer: '',
    report_header_image: '',
    report_header_image_width: 0,
    report_header_image_height: 0,
    report_header: '',
    report_footer: '',
});
const formDataListsPrev = reactive({
    title: '',
    description: '',
    pos_header_image: '',
    pos_header_image_width: 40,
    pos_header_image_height: 40,
    pos_header: '',
    pos_footer: '',
    report_header_image: '',
    report_header_image_width: 40,
    report_header_image_height: 40,
    report_header: '',
    report_footer: '',
});
const getSiteSettings = async () => {

    // userAuthStore.checkLogin()
    const config = {
        method: 'GET',
        url: 'api/site-setting',
        headers: {
            Authorization: `Bearer ${getToken('token')}`,
        },
    };
    try {
        $q.loading.show();
        const response = await api.request(config);
        $q.loading.hide();
        formDataLists.title = response.data.title;
        formDataListsPrev.title = response.data.title;
        formDataLists.description = response.data.description;
        formDataListsPrev.description = response.data.description;
        formDataLists.pos_header_image = response.data.pos_header_image;
        formDataListsPrev.pos_header_image = response.data.pos_header_image;
        formDataLists.pos_header_image_width = response.data.pos_header_image_width;
        formDataListsPrev.pos_header_image_width = response.data.pos_header_image_width;
        formDataLists.pos_header_image_height = response.data.pos_header_image_height;
        formDataListsPrev.pos_header_image_height = response.data.pos_header_image_height;
        formDataLists.pos_header = response.data.pos_header;
        formDataListsPrev.pos_header = response.data.pos_header;
        formDataLists.pos_footer = response.data.pos_footer;
        formDataListsPrev.pos_footer = response.data.pos_footer;
        formDataLists.report_header_image = response.data.report_header_image;
        formDataListsPrev.report_header_image = response.data.report_header_image;
        formDataLists.report_header_image_width = response.data.report_header_image_width;
        formDataListsPrev.report_header_image_width = response.data.report_header_image_width;
        formDataLists.report_header_image_height = response.data.report_header_image_height;
        formDataListsPrev.report_header_image_height = response.data.report_header_image_height;
        formDataLists.report_header = response.data.report_header;
        formDataListsPrev.report_header = response.data.report_header;
        formDataLists.report_footer = response.data.report_footer;
        formDataListsPrev.report_footer = response.data.report_footer;
    } catch (error) {
        if (error?.response?.status == 401) {
            $q.notify({
                message: error.response.data.message + '. Login to try again.',
                color: 'red',
                position: 'top',
                actions: [
                    {
                        icon: 'close',
                        color: 'white',
                        handler: () => {
                            /* ... */
                        },
                    },
                ],
            });
        } else {
            $q.notify({
                message: error.message,
                color: 'red',
                position: 'top',
                actions: [
                    {
                        icon: 'close',
                        color: 'white',
                        handler: () => {
                            /* ... */
                        },
                    },
                ],
            });
        }
        $q.loading.hide();
        console.error(error);
    } finally {
    }
};
onMounted(() => {
    getSiteSettings();
});
const updateSettings = async (e) => {
    // userAuthStore.checkLogin()
    e.preventDefault();
    formErrors.value = {};
    const data = {};
    if (formDataListsPrev.title !== formDataLists.title) {
        data.title = formDataLists.title;
    }
    if (formDataListsPrev.description !== formDataLists.description) {
        data.description = formDataLists.description;
    }
    if (formDataListsPrev.pos_header_image !== formDataLists.pos_header_image) {
        data.pos_header_image = formDataLists.pos_header_image;
    }
    if (formDataListsPrev.pos_header_image_width !== formDataLists.pos_header_image_width) {
        data.pos_header_image_width = formDataLists.pos_header_image_width;
    }
    if (formDataListsPrev.pos_header_image_height !== formDataLists.pos_header_image_height) {
        data.pos_header_image_height = formDataLists.pos_header_image_height;
    }
    if (formDataListsPrev.pos_header !== formDataLists.pos_header) {
        data.pos_header = formDataLists.pos_header;
    }
    if (formDataListsPrev.pos_footer !== formDataLists.pos_footer) {
        data.pos_footer = formDataLists.pos_footer;
    }
    if (formDataListsPrev.report_header_image !== formDataLists.report_header_image) {
        data.report_header_image = formDataLists.report_header_image;
    }
    if (formDataListsPrev.report_header_image_width !== formDataLists.report_header_image_width) {
        data.report_header_image_width = formDataLists.report_header_image_width;
    }
    if (formDataListsPrev.report_header_image_height !== formDataLists.report_header_image_height) {
        data.report_header_image_height = formDataLists.report_header_image_height;
    }
    if (formDataListsPrev.report_header !== formDataLists.report_header) {
        data.report_header = formDataLists.report_header;
    }
    if (formDataListsPrev.report_footer !== formDataLists.report_footer) {
        data.report_footer = formDataLists.report_footer;
    }
    // if (!emptyValidator(formDataLists.name)) {
    //     formErrors.value.name = 'Required feild';
    // }
    if (Object.keys(formErrors.value).length !== 0) {
        return;
    }
    if (Object.keys(data).length <= 0) {
        $q.notify({
            message: 'Empty Form Submission Not Allowed',
            color: 'red',
            position: 'top',
            actions: [
                {
                    icon: 'close',
                    color: 'white',
                    handler: () => {
                        /* ... */
                    },
                },
            ],
        });
        return;
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken('token')}`,
        },
        // bodyObject
        data,
    };
    config.method = 'post';
    config.url = 'api/site-setting';
    try {
        const response = await api.request(config);
        if (route.query?.redirect) {
            router.push(`/${route.query?.redirect}`);
        }
        $q.notify({
            message: 'Updated Successfully!',
            color: 'primary',
            position: 'top',
            actions: [
                {
                    icon: 'close',
                    color: 'white',
                    handler: () => {
                        /* ... */
                    },
                },
            ],
        });
    } catch (error) {
        if (error?.response?.status == 401) {
            $q.notify({
                message: error.response.data.message + '. Login to try again.',
                color: 'red',
                position: 'top',
                actions: [
                    {
                        icon: 'close',
                        color: 'white',
                        handler: () => {
                            /* ... */
                        },
                    },
                ],
            });
        } else {
            $q.notify({
                message: error.message,
                color: 'red',
                position: 'top',
                actions: [
                    {
                        icon: 'close',
                        color: 'white',
                        handler: () => {
                            /* ... */
                        },
                    },
                ],
            });
        }
        console.error(error);
    }
};
</script>
<style>
.site-settings-tabs .q-tab {
    flex: 0 1 auto;
}
</style>