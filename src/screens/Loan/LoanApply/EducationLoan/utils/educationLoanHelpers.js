// =====================================================
// EDUCATION LOAN HELPERS
// =====================================================


// =====================================================
// COMMON NUMBER HELPER
// =====================================================

export const toNumber = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  const number = Number(
    String(value)
      .replace(/[₹,]/g, "")
      .trim()
  );

  return Number.isNaN(number)
    ? 0
    : number;
};


// =====================================================
// FILE URL
// =====================================================

export const getFileUrl = (file) => {
  if (!file) {
    return null;
  }

  return (
    file?.url ||
    file?.file ||
    file?.uri ||
    null
  );
};


// =====================================================
// DOCUMENT ID
//
// IMPORTANT:
// ID backend product.documents se aayegi.
// Yahan koi hardcoded ID nahi hai.
// =====================================================

export const getDocumentByCode = (
  product,
  code
) => {
  const documents = Array.isArray(
    product?.documents
  )
    ? product.documents
    : [];

  return documents.find(
    (item) =>
      item?.code === code
  );
};


// =====================================================
// BUILD BACKEND DOCUMENTS
// =====================================================

export const buildEducationDocuments = (
  formData,
  product
) => {
  const uploadedDocuments =
    formData?.documents || {};

  const documentCodes = [
    "AADHAAR",
    "PAN",
    "ADMISSION_LETTER",
    "FEE_STRUCTURE",
    "LATEST_MARKSHEET",
  ];

  const documents = [];

  documentCodes.forEach(
    (code) => {
      const backendDocument =
        getDocumentByCode(
          product,
          code
        );

      const documentId =
        backendDocument?.documentId;

      const files =
        Array.isArray(
          uploadedDocuments?.[code]
        )
          ? uploadedDocuments[code]
          : [];

      if (!documentId) {
        console.warn(
          `Education document ID missing for ${code}`
        );

        return;
      }

      files.forEach(
        (file) => {
          const fileUrl =
            getFileUrl(file);

          if (!fileUrl) {
            return;
          }

          documents.push({
            document: documentId,
            file: fileUrl,
          });
        }
      );
    }
  );

  return documents;
};


// =====================================================
// STEP 1 VALIDATION
// PERSONAL DETAILS
// =====================================================

export const validatePersonalDetails = (
  formData
) => {
  const errors = {};


  // ===================================================
  // 1. FULL NAME
  // ===================================================

  const fullName =
    String(
      formData?.fullName || ""
    ).trim();

  if (!fullName) {
    errors.fullName =
      "Enter full name";
  } else if (
    fullName.length < 2
  ) {
    errors.fullName =
      "Enter a valid full name";
  } else if (
    !/^[A-Za-z\s.'-]+$/.test(
      fullName
    )
  ) {
    errors.fullName =
      "Enter a valid full name";
  }


  // ===================================================
  // 2. DATE OF BIRTH
  // ===================================================

  const dob =
    String(
      formData?.dateOfBirth || ""
    ).trim();

  if (!dob) {
    errors.dateOfBirth =
      "Select date of birth";
  } else {
    const dobRegex =
      /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (
      !dobRegex.test(dob)
    ) {
      errors.dateOfBirth =
        "Enter a valid date of birth";
    } else {
      const [
        day,
        month,
        year,
      ] =
        dob
          .split("/")
          .map(Number);

      const date =
        new Date(
          year,
          month - 1,
          day
        );

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const isValidDate =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

      if (!isValidDate) {
        errors.dateOfBirth =
          "Enter a valid date of birth";
      } else if (
        date > today
      ) {
        errors.dateOfBirth =
          "Date of birth cannot be in the future";
      }
    }
  }


  // ===================================================
  // 3. MOBILE NUMBER
  // ===================================================

  const mobile =
    String(
      formData?.mobileNumber || ""
    )
      .replace(/\s/g, "")
      .trim();

  if (!mobile) {
    errors.mobileNumber =
      "Enter mobile number";
  } else if (
    !/^[6-9]\d{9}$/.test(
      mobile
    )
  ) {
    errors.mobileNumber =
      "Enter a valid 10-digit mobile number";
  }


  // ===================================================
  // 4. EMAIL
  // ===================================================

  const email =
    String(
      formData?.email || ""
    )
      .trim()
      .toLowerCase();

  if (!email) {
    errors.email =
      "Enter email address";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
      email
    )
  ) {
    errors.email =
      "Enter a valid email address";
  }


  // ===================================================
  // 5. AADHAAR
  // ===================================================

  const aadhaar =
    String(
      formData?.aadhaarNumber || ""
    )
      .replace(/\s/g, "")
      .trim();

  if (!aadhaar) {
    errors.aadhaarNumber =
      "Enter Aadhaar number";
  } else if (
    !/^\d{12}$/.test(
      aadhaar
    )
  ) {
    errors.aadhaarNumber =
      "Enter a valid 12-digit Aadhaar number";
  }


  // ===================================================
  // 6. PAN
  // ===================================================

  const pan =
    String(
      formData?.panNumber || ""
    )
      .trim()
      .toUpperCase();

  if (!pan) {
    errors.panNumber =
      "Enter PAN number";
  } else if (
    !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
      pan
    )
  ) {
    errors.panNumber =
      "Enter a valid PAN number";
  }


  // ===================================================
  // 7. PIN CODE
  // ===================================================

  const pincode =
    String(
      formData?.pincode || ""
    )
      .replace(/\s/g, "")
      .trim();

  if (!pincode) {
    errors.pincode =
      "Enter PIN code";
  } else if (
    !/^[1-9]\d{5}$/.test(
      pincode
    )
  ) {
    errors.pincode =
      "Enter a valid 6-digit PIN code";
  }


  return errors;
};


// =====================================================
// STEP 1 FIELD VALIDATION
//
// IMPORTANT:
// No validation rules here.
// It simply reuses validatePersonalDetails.
// =====================================================

export const validatePersonalField = (
  field,
  formData
) => {
  const errors =
    validatePersonalDetails(
      formData
    );

  return (
    errors?.[field] ||
    ""
  );
};


// =====================================================
// STEP 2 VALIDATION
// ACADEMIC INFORMATION
// =====================================================

export const validateAcademicInfo = (
  formData
) => {
  const errors = {};

  const requiredFields = [
    [
      "course",
      "Enter course name",
    ],
    [
      "specialization",
      "Enter specialization",
    ],
    [
      "durationYears",
      "Enter course duration",
    ],
    [
      "collegeUniversity",
      "Enter college / university",
    ],
    [
      "country",
      "Enter country",
    ],
    [
      "state",
      "Select state",
    ],
    [
      "city",
      "Enter city",
    ],
    [
      "admissionStatus",
      "Select admission status",
    ],
  ];

  requiredFields.forEach(
    ([key, message]) => {
      if (
        !String(
          formData?.[key] || ""
        ).trim()
      ) {
        errors[key] =
          message;
      }
    }
  );

  return errors;
};


// =====================================================
// STEP 2 FIELD VALIDATION
//
// IMPORTANT:
// No validation rules here.
// It simply reuses validateAcademicInfo.
// =====================================================

export const validateAcademicField = (
  field,
  formData
) => {
  const errors =
    validateAcademicInfo(
      formData
    );

  return (
    errors?.[field] ||
    ""
  );
};


// =====================================================
// STEP 3 VALIDATION
// LOAN AMOUNT
// =====================================================

export const validateLoanAmount = (
  formData
) => {
  const errors = {};

  const amount =
    toNumber(
      formData?.loanAmount
    );

  const totalCourseCost =
    toNumber(
      formData?.totalCourseCost
    );

  const otherExpenses =
    toNumber(
      formData?.otherExpenses
    );


  // ===================================================
  // LOAN AMOUNT
  // ===================================================

  if (!amount) {
    errors.loanAmount =
      "Enter loan amount";
  } else if (
    amount < 50000 ||
    amount > 5000000
  ) {
    errors.loanAmount =
      "Loan amount must be between ₹50,000 and ₹50,00,000";
  }


  // ===================================================
  // TOTAL COURSE COST
  // ===================================================

  if (
    formData?.totalCourseCost ===
      undefined ||
    formData?.totalCourseCost ===
      ""
  ) {
    errors.totalCourseCost =
      "Enter total course cost";
  } else if (
    totalCourseCost < 0
  ) {
    errors.totalCourseCost =
      "Enter valid course cost";
  }


  // ===================================================
  // OTHER EXPENSES
  // ===================================================

  if (
    formData?.otherExpenses ===
      undefined ||
    formData?.otherExpenses ===
      ""
  ) {
    errors.otherExpenses =
      "Enter other expenses";
  } else if (
    otherExpenses < 0
  ) {
    errors.otherExpenses =
      "Enter valid other expenses";
  }


  return errors;
};


// =====================================================
// STEP 3 FIELD VALIDATION
//
// IMPORTANT:
// No validation rules here.
// It simply reuses validateLoanAmount.
// =====================================================

export const validateLoanAmountField = (
  field,
  formData
) => {
  const errors =
    validateLoanAmount(
      formData
    );

  return (
    errors?.[field] ||
    ""
  );
};


// =====================================================
// STEP 4 VALIDATION
// PARENTS / GUARDIAN INFORMATION
// =====================================================

export const validateGuardianInfo = (
  formData
) => {
  const errors = {};

  const requiredFields = [
    [
      "parentGuardianName",
      "Enter parents / guardian name",
    ],
    [
      "guardianRelationship",
      "Enter relationship",
    ],
    [
      "guardianMobileNumber",
      "Enter mobile number",
    ],
    [
      "guardianOccupation",
      "Enter occupation",
    ],
    [
      "guardianEmployerName",
      "Enter employer name",
    ],
    [
      "guardianMonthlyIncome",
      "Enter monthly income",
    ],
    [
      "guardianAnnualIncome",
      "Enter annual income",
    ],
    [
      "guardianPanNumber",
      "Enter PAN number",
    ],
  ];

  requiredFields.forEach(
    ([key, message]) => {
      if (
        !String(
          formData?.[key] || ""
        ).trim()
      ) {
        errors[key] =
          message;
      }
    }
  );


  // ===================================================
  // GUARDIAN MOBILE NUMBER
  // ===================================================

  const guardianMobile =
    String(
      formData?.guardianMobileNumber || ""
    )
      .replace(/\s/g, "")
      .trim();

  if (
    guardianMobile &&
    !/^[6-9]\d{9}$/.test(
      guardianMobile
    )
  ) {
    errors.guardianMobileNumber =
      "Enter a valid 10-digit mobile number";
  }


  // ===================================================
  // GUARDIAN PAN NUMBER
  // ===================================================

  const guardianPan =
    String(
      formData?.guardianPanNumber || ""
    )
      .trim()
      .toUpperCase();

  if (
    guardianPan &&
    !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
      guardianPan
    )
  ) {
    errors.guardianPanNumber =
      "Enter a valid PAN number";
  }


  return errors;
};


// =====================================================
// STEP 4 FIELD VALIDATION
//
// IMPORTANT:
// No validation rules here.
// It simply reuses validateGuardianInfo.
// =====================================================

export const validateGuardianField = (
  field,
  formData
) => {
  const errors =
    validateGuardianInfo(
      formData
    );

  return (
    errors?.[field] ||
    ""
  );
};


// =====================================================
// STEP 5 VALIDATION
// FINANCIAL INFORMATION
// =====================================================

export const validateFinancialInfo = (
  formData
) => {
  const errors = {};

  const requiredFields = [
    [
      "bankName",
      "Enter bank name",
    ],
    [
      "accountNumber",
      "Enter account number",
    ],
    [
      "ifscCode",
      "Enter IFSC code",
    ],
  ];

  requiredFields.forEach(
    ([key, message]) => {
      if (
        !String(
          formData?.[key] || ""
        ).trim()
      ) {
        errors[key] =
          message;
      }
    }
  );

  return errors;
};


// =====================================================
// STEP 5 FIELD VALIDATION
//
// IMPORTANT:
// No validation rules here.
// It simply reuses validateFinancialInfo.
// =====================================================

export const validateFinancialField = (
  field,
  formData
) => {
  const errors =
    validateFinancialInfo(
      formData
    );

  return (
    errors?.[field] ||
    ""
  );
};


// =====================================================
// STEP 6 VALIDATION
// DOCUMENTS
// =====================================================

export const validateDocuments = (
  formData
) => {
  const errors = {};

  const documents =
    formData?.documents || {};

  const requiredCodes = [
    "AADHAAR",
    "PAN",
    "ADMISSION_LETTER",
    "FEE_STRUCTURE",
    "LATEST_MARKSHEET",
  ];

  requiredCodes.forEach(
    (code) => {
      if (
        !Array.isArray(
          documents?.[code]
        ) ||
        documents[code].length ===
          0
      ) {
        errors[code] =
          "Please upload this document";
      }
    }
  );

  return errors;
};


// =====================================================
// STEP 6 FIELD VALIDATION
//
// IMPORTANT:
// No validation rules here.
// It simply reuses validateDocuments.
// =====================================================

export const validateDocumentField = (
  field,
  formData
) => {
  const errors =
    validateDocuments(
      formData
    );

  return (
    errors?.[field] ||
    ""
  );
};


// =====================================================
// STEP 7 VALIDATION
// REVIEW
// =====================================================

export const validateReview = (
  formData
) => {
  const errors = {};


  // ===================================================
  // PREFERRED BANK
  // ===================================================

  if (
    !String(
      formData?.preferredBank || ""
    ).trim()
  ) {
    errors.preferredBank =
      "Select preferred bank";
  }


  // ===================================================
  // LOAN TENURE
  // ===================================================

  if (
    !String(
      formData?.loanTenure || ""
    ).trim()
  ) {
    errors.loanTenure =
      "Select loan tenure";
  }


  // ===================================================
  // MORATORIUM PERIOD
  // ===================================================

  if (
    !String(
      formData?.moratoriumPeriod || ""
    ).trim()
  ) {
    errors.moratoriumPeriod =
      "Select moratorium period";
  }


  // ===================================================
  // DECLARATION
  // ===================================================

  if (
    !formData?.declarationAccepted
  ) {
    errors.declarationAccepted =
      "Please accept declaration";
  }


  return errors;
};


// =====================================================
// STEP 7 FIELD VALIDATION
//
// IMPORTANT:
// No validation rules here.
// It simply reuses validateReview.
// =====================================================

export const validateReviewField = (
  field,
  formData
) => {
  const errors =
    validateReview(
      formData
    );

  return (
    errors?.[field] ||
    ""
  );
};