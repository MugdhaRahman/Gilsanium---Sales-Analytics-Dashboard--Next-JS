import type {ThemeConfig} from 'antd';

const theme: ThemeConfig = {
    token: {

        colorPrimary: '#414FF4',
        colorBorder: '#EFEFEF',
        colorError: '#ff4d4f',

        colorBgBase: '#ffffff',
        colorBgContainer: '#ffffff',
        colorPrimaryBg: '#ffffff',
        colorInfoBg: '#F9F9F9',
        colorBgMask: '#F9F9F9',
        colorErrorBg: '#fff1f0',
        colorSuccessBg: '#f0fdf4',

        colorTextBase: '#2B3674',
        colorTextSecondary: '#555E67',
        colorTextTertiary: 'rgba(43, 54, 116, 0.50)',
        colorTextQuaternary: '#D9D9D9',
        colorSuccessText: '#058F3F',

        fontSizeHeading1: 24,
        fontSizeHeading2: 18,
        fontSizeHeading3: 16,
        fontSizeHeading4: 12,
        colorTextHeading: '#2B3674',
    },
    components: {
        Button: {
            fontWeight: 500,
            paddingContentHorizontal: 16,
            paddingContentVertical: 12,
            colorPrimary: '#414FF4',
            colorPrimaryHover: '#3a41d9',
            colorPrimaryActive: '#3338c7',
            colorPrimaryText: '#ffffff',
            borderRadius: 8,
        },
        Select: {
            colorPrimary: '#414FF4',
            colorPrimaryHover: '#ffffff',
            colorPrimaryActive: '#ffffff',
            colorBgBase: '#F9F9F9'
        },
        DatePicker: {
            colorPrimary: '#414FF4',
        },
        Typography: {
            colorTextHeading: '#2B3674',
            colorText: '#2B3674',
            colorTextSecondary: '#555E67',
            colorTextTertiary: '#D9D9D9',
        },
        Slider:{
            colorPrimary: '#2B3674',
            colorPrimaryHover: '#ffffff',
            colorPrimaryActive: '#ffffff',
        }

    },


};

export default theme;