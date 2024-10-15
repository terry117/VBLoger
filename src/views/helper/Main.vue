<template>
    <div>
        <el-card shadow="never" style="min-height: 600px;margin-bottom: 20px;">
            <el-collapse v-model="active" accordion>
                <el-collapse-item title="业务历程" name="deploy">
                    <el-carousel trigger="click" height="352px" :autoplay="false" @change="deployChange">
                        <el-carousel-item v-for="(item,index) in deploy.images" :key="'deploy'+index">
                            <div style="border-radius:5px; border: 1px solid #EBEEF5;height: 350px;">
                                <img :src="item" style="width: 100%;height:350px;">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                    <el-steps :active="deploy.active" align-center style="margin-top: 20px;" :process-status="deploy.status">
                        <el-step title="电力防务" description="集控站防务操作系统/接地线管理系统"></el-step>
                        <el-step title="停车场管理" description="NetParkClient停车管理系统"></el-step>
                        <el-step title="会议系统" description="无纸化会议系统/语音转写智能会议系统/电子桌牌系统"></el-step>
                        <el-step title="智慧屏" description="会议白板/集控/传屏"></el-step>
                    </el-steps>
                </el-collapse-item>            
                <el-collapse-item title="致谢" name="develop">
                    <div style="padding: 10px;line-height: 30px;color: #303133;font-size: 16px">
                        在工作中感谢家人的支持，感谢同事的帮组。本博客网站于
                        <tt>2024/09/15</tt> 开始搭建
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                active: "deploy",
                deploy: {
                    images: [
                        require('../../assets/deploy0.png'),
                        require('../../assets/deploy1.png'),
                        require('../../assets/deploy2.png'),
                        require('../../assets/deploy3.png')
                    ],
                    status: "process",
                    active: 0,
                },
            }
        },
        mounted() {

        },
        methods: {
            deployChange(index) {
                this.deploy.status = index == 2 ? "success" : "process"
                this.deploy.active = index
            }       
        }
    }
</script>