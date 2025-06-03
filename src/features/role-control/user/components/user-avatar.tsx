import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Flex, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import type { RcFile } from 'antd/es/upload';

interface Props {
  value?: RcFile;
  onChange?: (value?: RcFile) => void;
  src?: string;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const UserAvatar = (props: Props) => {
  const { onChange = () => {}, src = '' } = props;

  const [imageUrl, setImageUrl] = useState<string>(src);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadChildren = () => {
    if (imageUrl) {
      return (
        <img className="h-full w-full rounded-full object-cover" src={imageUrl} alt="avatar" />
      );
    }
    return (
      <button className="border-0 bg-none" type="button">
        <PlusOutlined />
        <div className="mt-2">Tải lên</div>
      </button>
    );
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange(info) {
      onChange(info.fileList.at(-1)?.originFileObj);
      getBase64(info.file as FileType, (url) => setImageUrl(url));
    },
    fileList,
  };

  return (
    <Flex gap="middle" wrap>
      <Upload {...uploadProps} name="avatar" listType="picture-circle" showUploadList={false}>
        {uploadChildren()}
      </Upload>
    </Flex>
  );
};
