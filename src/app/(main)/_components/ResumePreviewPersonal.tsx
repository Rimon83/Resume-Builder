import { ResumeValues } from "@/lib/validate";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BorderStyles } from "./BorderStyleButton";
interface Props {
  resumeData: ResumeValues;
}

const ResumePreviewPersonal = ({ resumeData }: Props) => {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    colorHex,
    borderStyle,
  } = resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          alt="Author photo"
          width={100}
          height={100}
          className="aspect-square object-cover"
          style={{
            borderRadius:
              borderStyle === BorderStyles.SQUARE
                ? "0px"
                : borderStyle === BorderStyles.CIRCLE
                  ? "9999PX"
                  : "10%",
          }}
        />
      )}

      <div className="space-y-3">
        <div className="space-y-2">
          <p className="text-2xl font-bold" style={{ color: colorHex }}>
            {firstName} {lastName}
          </p>
          <p style={{ color: colorHex }} className="font-medium">
            {jobTitle}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " | " : ""}
          {[phone, email].filter(Boolean).join(" | ")}
        </p>
      </div>
    </div>
  );
};

export default ResumePreviewPersonal;
