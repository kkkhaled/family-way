import shortid from "shortid";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import AttachmentRoundedIcon from "@material-ui/icons/AttachmentRounded";

export default {
  catagiories: [
    {
      title: "اضافه الاصناف",
      icon: AddCircleRoundedIcon,
      to: "/Addcatagiories",
      id: shortid.generate(),
    },
  ],
  getsubcagiories: [
    {
      title: "عرض الاصناف الفرعيه",
      icon: AttachmentRoundedIcon,
      to: "/Getsubcatagiories",
      id: shortid.generate(),
    },
  ],
};
