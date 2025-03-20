import * as Yup from "yup";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { request, RESULTS, PERMISSIONS } from 'react-native-permissions';
import { Alert, Platform } from "react-native";

export const validBanks = [
    { label: "State Bank of India", value: "SBI" },
    { label: "HDFC Bank", value: "HDFC" },
    { label: "ICICI Bank", value: "ICICI" },
    { label: "Axis Bank", value: "Axis" },
    { label: "Punjab National Bank", value: "PNB" },
    { label: "Kotak Mahindra Bank", value: "Kotak" },
    { label: "Canara Bank", value: "Canara" },
    { label: "Bank of Baroda", value: "BoB" },
    { label: "IndusInd Bank", value: "IndusInd" },
    { label: "Union Bank of India", value: "Union" },
  ];

export const validationSchema = Yup.object().shape({
    owner_name: Yup.string().required("Owner Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    kitchen_name: Yup.string().required("Kitchen Name is required"),
    aadhar_number: Yup.string()
      .matches(/^[0-9]{12}$/, "Aadhar number must be exactly 12 digits")
      .required("Aadhar Number is required"),
    aadhar_front: Yup.string().required("Aadhar front image is required"),
    aadhar_back: Yup.string().required("Aadhar back image is required"),
    pan_number: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number format (ABCDE1234F)")
      .required("PAN Number is required"),
    pan_front: Yup.string().required("Pan front image is required"),
    pan_back: Yup.string().required("Pan back image is required"),
    gst_number: Yup.string()
      .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, "Invalid GST Number format")
      .required("GST Number is required"),
    gst_image: Yup.string().required("GST image is required"),
    fssia_number: Yup.string()
      .matches(/^[0-9]{14}$/, "FSSAI number must be exactly 14 digits")
      .required("FSSAI Number is required"),
    fssai_image: Yup.string().required("FSSAI Image is required"),
    fssai_expiry_date: Yup.string().required("FSSAI Expiry Date is required"),
    address_line_one: Yup.string().required("Address line 1 is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
    bank_holder_name: Yup.string().required("Bank holder name is required"),
    bank_name: Yup.string()
      .required("Bank name is required"),
    ifsc_code: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code format")
      .required("IFSC Code is required"),
    account_number: Yup.string()
      .matches(/^[0-9]{6,18}$/, "Account number must be 6-18 digits")
      .required("Account number is required"),
    lat: Yup.number()
      .typeError("Latitude must be a number")
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90")
      .required("Latitude is required"),
    long: Yup.number()
      .typeError("Longitude must be a number")
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180")
      .required("Longitude is required"),
  });

export const handleImageUpload = async (imageType, onChange, setImages) => {
    try {
      let cameraPermission, galleryPermission;

      if (Platform.OS === 'ios') {
        cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
        galleryPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        console.log(galleryPermission,'gallery permission hey anushka')
      } else if (Platform.OS === 'android') {
        cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
        galleryPermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      }

      if (!cameraPermission || !galleryPermission) {
        console.error("Permission request returned null or undefined.");
        return;
      }

      if (cameraPermission !== RESULTS.GRANTED || galleryPermission !== RESULTS.GRANTED) {
        console.log("Camera or gallery permission not granted");
        return;
      }

      Alert.alert(
        "Select Image",
        "Choose an option",
        [
          {
            text: "Camera",
            onPress: async () => {
              const response = await launchCamera({
                mediaType: 'photo',
                includeBase64: true,
                saveToPhotos: true,
              });
              if(imageType){
                handleImageResponse(response, imageType, onChange, setImages);
              }else{
                handlePlanImagePreview(response, onChange, setImages)
              }            },
          },
          {
            text: "Gallery",
            onPress: async () => {
              const response = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: true,
              });
              if(imageType){
                handleImageResponse(response, imageType, onChange, setImages);
              }else{
                handlePlanImagePreview(response, onChange, setImages)
              }
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } catch (error) {
      console.error('Permission request failed:', error);
    }
  };

export const handleImageResponse = (response, imageType, onChange, setImages) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error:', response.errorMessage);
    } else {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];

        if (selectedImage.fileSize > 1048576) {
          Alert.alert("Image too large", "Please select an image smaller than 1MB.");
          return;
        }

        const base64String = `data:image/jpeg;base64,${selectedImage.base64}`;
          setImages((prevImages) => ({
            ...prevImages,
            [imageType]: base64String,
          }));
          onChange(base64String);
      }
    }
  };

  export const handlePlanImagePreview = (response, onChange, setImages) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error:', response.errorMessage);
    } else {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];

        if (selectedImage.fileSize > 1048576) {
          Alert.alert("Image too large", "Please select an image smaller than 1MB.");
          return;
        }

        const base64String = `data:image/jpeg;base64,${selectedImage.base64}`;
        setImages(base64String);
        onChange(base64String);
      }
    }
  };

export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2); 

  const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm} (${dayOfWeek})`;
}

export function formatPayoutDate(dateString, type) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthStr = months[date.getMonth()];

  if(type == 'start'){
    return `${day} ${monthStr}`;
  }else if(type == 'end'){
    return `${day} ${monthStr}, ${year}`;
  }else{
    return `${day}, ${monthStr}, ${year}`;
  }
}
