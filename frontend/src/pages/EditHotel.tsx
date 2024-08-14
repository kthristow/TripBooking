import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

export const EditHotel = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    "fetchMyHoteById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId, //pros and cons for using TypeScript.
      //This is an example for cons. I write a code that will never runs, but i had to because for the needed type "string | undefined"
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      navigate('/my-hotels');
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
