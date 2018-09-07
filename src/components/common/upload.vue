<template>
    <div>
        <div class="demo-upload-list" v-for="item in uploadList" :key="item.name">
            <template v-if="item.status === 'finished'">
                <img :src="item.url" v-if="uploadType == 'png' || uploadType == 'jpg' || uploadType == 'jpeg'">
                <video :src="item.url" controls autobuffer v-else>
                    <!-- <source :src="item.url" type="video/mp4"> -->
                </video>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
       <Upload 
       ref="upload"
       :action="uploadUrl"
       :default-file-list="defaultList"
       :on-success="handleSuccess"
       :before-upload="handleBeforeUpload"
       :on-format-error="handleFormatError"
       style="display: inline-block;width:58px;"
       :show-upload-list="false"
       name="upload" 
       >
            <div style="width: 58px;height:58px;line-height: 58px;overflow: hidden;border: 1px dashed #dcdee2;text-align: center;cursor: pointer;">
               <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
    </div>
</template>
<script>
import Util from '../../util/util';
import Store from "../../store/index";
import Api from "../../store/Api";

    export default {
        data () {
            return {
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                uploadUrl:"",
                uploadType:'',

            }
        },
        props: ['defaultUrl','type','videoData'],
        methods: {
            handleSuccess (res, file) {
                console.log('handleSuccess',file)
                console.log('handleSuccess',res)
                if(res.code == '200'){
                    file.url = 'http://allbuywine.oss-cn-hangzhou.aliyuncs.com/'+res.dataMap;
                    Store.commit('getUploadUrl',res.dataMap);
                    let fileList = this.$refs.upload.fileList;
                    this.$refs.upload.fileList.splice(0,fileList.length-1);
                    this.uploadType = res.dataMap.split('.')[1];
                    let meadiaType = (this.uploadType == 'png' || this.uploadType == 'jpg' || this.uploadType == 'jpeg') ? 1 : 2;
                    console.log('uploadType',this.videoData)
                    if(this.type == 'video'){
                        //上传宣传片
                        let createProductMediaData = Object.assign(this.videoData,{
                            mediaUrl:'http://allbuywine.oss-cn-hangzhou.aliyuncs.com/'+res.dataMap,
                            type:meadiaType
                        })
                        Api.createProductMedia(createProductMediaData).then((data) => {
                            if(data.code == '200'){
                                Store.commit('getVideoId',data.dataMap);
                                this.$Notice.success({
                                    title: '上传成功',
                                });
                            }
                            console.log('createProductMediaData',data)
                        })
                    }else{
                            this.$Notice.success({
                            title: '上传成功',
                        });
                    }
                }else{
                    this.$Notice.warning({
                            title: res.message,
                        });
                } 
                
            },
            handleFormatError (file) {
                // this.$Notice.warning({
                //     title: '上传格式错误',
                //     desc: '请上传jpg/jpeg/png文件'
                // });
            },
            handleBeforeUpload (info) {
                // const check = this.uploadList.length < 1;
                // if (!check) {
                //     this.$Notice.warning({
                //         title: 'Up to five pictures can be uploaded.'
                //     });
                // }
                // return check;
                // this.$refs.upload.fileList = [];
                console.log('info',info)
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
            this.uploadUrl = "http://server.sangyiwen.top/file/upload;JSESSIONID=" + Util.getUser();
            console
            // this.defaultList = !!this.defaultUrl ? [{name:'',url:this.defaultUrl}] : [];
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
