<template>
    <div>
        <side-sheet>
            <div class="create-request-container">
                <b-button icon-right="close" type="is-white"></b-button>

                <div class="title is-4">Create Request</div>

                <b-steps
                    :animated="true"
                    :has-navigation="false"
                    v-model="activeStep"
                >
                    <b-step-item icon="numeric-1">
                        <div class="title is-6">Choose an eligble service</div>
                        <div class="subtitle is-7">
                            Only staff engaged in services from this list are
                            entitled to receive passes!
                        </div>

                        <ul class="reason-list-container">
                            <li
                                :key="i"
                                @click="setReason(reason)"
                                v-for="(reason, i) in reasonList"
                            >
                                <div>{{ reason }}</div>
                                <b-icon
                                    :type="{
                                        'is-primary': reason === selectedReason
                                    }"
                                    icon="check-circle"
                                ></b-icon>
                            </li>
                        </ul>
                    </b-step-item>
                    <b-step-item icon="numeric-2">
                        <div class="title is-6">Select a pass type</div>

                        <div class="pass-container">
                            <div
                                :class="{ active: passType === 'person' }"
                                @click="setPassType('person')"
                                class="pass-card"
                            >
                                <div class="is-flex pass-card-body">
                                    <div>
                                        <div class="title is-5">
                                            Individual pass
                                        </div>
                                        <div class="subtitle is-7">
                                            Each pass verifies a specific
                                            inividual only!
                                        </div>
                                    </div>

                                    <img
                                        alt
                                        src="../assets/individual-icon.png"
                                        width="56"
                                    />
                                </div>
                            </div>
                            <div
                                :class="{ active: passType === 'vehicle' }"
                                @click="setPassType('vehicle')"
                                class="pass-card"
                            >
                                <div class="is-flex pass-card-body">
                                    <div>
                                        <div class="title is-5">
                                            Vehicle pass
                                        </div>
                                        <div
                                            class="subtitle is-7 line-height-1.5"
                                        >
                                            Each pass verifies anyone operating
                                            the vehicle!
                                        </div>
                                    </div>

                                    <img
                                        alt
                                        src="../assets/vehicle-icon.png"
                                        width="56"
                                    />
                                </div>
                            </div>
                        </div>
                    </b-step-item>
                    <b-step-item icon="numeric-3">
                        <div class="title is-6">Download Template</div>

                        <b-button
                            class="has-text-primary has-text-weight-semibold"
                            icon-left="download"
                            size="is-small"
                            tag="a"
                            type="is-white"
                            >Download Pass Template</b-button
                        >

                        <hr />

                        <div class="title is-6">Upload the file</div>
                        <div></div>
                        <div class="subtitle is-7">
                            Ensure all details have been filled in the template
                            file
                        </div>

                        <label
                            class="upload-file-container is-flex has-text-primary"
                            for="orderFile"
                        >
                            <b-icon
                                icon="file-upload"
                                size="is-medium"
                            ></b-icon>
                            <div class="text">Upload .csv file</div>
                            <input
                                @change="handleFile"
                                accept=".csv"
                                hidden
                                id="orderFile"
                                name="order"
                                ref="orderFile"
                                type="file"
                            />
                        </label>

                        <div class="file-status is-flex" v-if="file">
                            <b-icon
                                icon="check-circle"
                                type="is-success"
                            ></b-icon>
                            <span class="subtitle is-6">{{ file.name }}</span>
                        </div>
                    </b-step-item>
                </b-steps>

                <div class="step-navigtion-container">
                    <b-button @click="proceed" expanded type="is-primary">
                        <span v-if="activeStep === 2">Send Request</span>
                        <span v-else>Proceed</span>
                    </b-button>
                </div>
            </div>
        </side-sheet>
    </div>
</template>

<script>
import SideSheet from './SideSheet.vue';
import { AUTHTOKEN } from '../utils/contants';
import EPassService from '../service/EPassService';

export default {
    name: 'CreateRequest',

    components: {
        SideSheet
    },
    data() {
        return {
            activeStep: 0,
            selectedReason: null,
            passType: 'person',
            reasonList: [
                'Essentials delivery services',
                'Medical services',
                'Hotels / Lodges accomodating tourists',
                'Private security services',
                'Cold storage / Warehouse facilities',
                'Banks, ATM, Insuarance Companies',
                'Petrol, GAS, LPG station'
            ],
            file: null,
            apiError: null
        };
    },
    methods: {
        setReason(reason) {
            this.selectedReason = reason;
        },

        setPassType(type) {
            this.passType = type;
        },

        handleStep1() {
            this.activeStep = 1;
        },
        handleStep2() {
            this.activeStep = 2;
        },
        handleStep3() {
            this.createOrder();
        },

        handleFile() {
            this.file = this.$refs.orderFile.files[0];
            this.$refs.orderFile.files = null;
        },

        proceed() {
            switch (this.activeStep) {
                case 0:
                    this.handleStep1();
                    break;

                case 1:
                    this.handleStep2();
                    break;

                case 2:
                    this.handleStep3();
                    break;
            }
        },

        async createOrder() {
            const formData = new FormData();

            formData.append('file', this.file);
            formData.append('orderType', this.passType);
            formData.append('purpose', this.selectedReason);
            formData.append('authToken', localStorage.getItem(AUTHTOKEN));

            try {
                await EPassService.createOrder(formData);

                this.$emit('success');
            } catch (error) {
                this.apiError = error;
            }
        }
    }
};
</script>

<style lang="scss">
.create-request-container {
    position: relative;
    padding: 30px 30px 100px;
    height: 100vh;
}
.reason-list-container {
    border-top: 1px solid #c6cbd4;
    li {
        padding: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        &:hover {
            background-color: #f5f5f5;
        }
    }
}

.step-content {
    margin-top: 24px;
}

.step-navigtion-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 24px 32px;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
}

.pass-card {
    border-radius: 4px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    background-color: #f5f5f5;
    padding: 16px 24px;
    margin-top: 16px;
    cursor: pointer;

    &.active {
        border: 2px solid #00a4ff;
    }

    &:hover:not(.active) {
        transition: all 0.3s ease;

        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    }

    &-body {
        justify-content: space-between;
        align-items: center;
        img {
            margin-left: 8px;
        }
    }
}
.line-height-1.\5 {
    line-height: 1.5;
}

.upload-file-container {
    border-radius: 4px;
    border: 1px dashed #c6cbd4;
    padding: 20px;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }
    .text {
        margin-left: 8px;
    }
}

.file-status {
    margin-top: 16px;
    align-items: center;
    .subtitle {
        margin-left: 8px;
    }
}
</style>
