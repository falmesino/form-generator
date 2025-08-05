// form_templates
/*
NOTES:
# jika category_type adalah layout, maka struktur objectnya:
{
    "id": string,
    "label": string,
    "placeholder": null|string,
    "type": string,
    "type_category": string,
    "order": integer,
    "components": array
}
# jika category_type adalah field, maka struktur objectnya:
{
    "id": string,
    "label": string,
    "placeholder": null|string,
    "type": string,
    "type_category": string,
    "order": integer,
    "validation": object,
    "options": array,
    "source": null|string,
    "depend_on": null|string
}
*/
[
    {
        "id": 1,
        "title": "Formulir Pendafatar Siswa Baru",
        "description": "Formulir ini digunakan untuk mengumpulkan informasi siswa baru.",
        "components": [
            {
                "id": "informasi_pribadi",
                "label": "Informasi Pribadi",
                "placeholder": null,
                "type": "section",
                "type_category": "layout",
                "order": 1,
                "components": [
                    {
                        "id": "nama_lengkap",
                        "label": "Nama Lengkap",
                        "placeholder": "Masukkan nama lengkap",
                        "type": "text",
                        "type_category": "field",
                        "order": 1,
                        "validation": {
                            "required": true,
                            "min_length": 3,
                            "max_length": 100,
                            "pattern": "^[a-zA-Z ]+$"
                        },
                        "options": [],
                        "source": null,
                        "depend_on": null
                    },
                    {
                        "id": "jenis_kelamin",
                        "label": "Jenis Kelamin",
                        "placeholder": null,
                        "type": "radio",
                        "type_category": "field",
                        "order": 2,
                        "validation": {
                            "required": true
                        },
                        "options": ["Laki-laki", "Perempuan"],
                        "source": null,
                        "depend_on": null
                    },
                    {
                        "id": "tempat_tinggal",
                        "label": "Tempat Tinggal",
                        "placeholder": null,
                        "type": "section",
                        "type_category": "layout",
                        "order": 3,
                        "components": [
                            {
                                "id": "provinsi",
                                "label": "Provinsi",
                                "placeholder": "-- Pilih Provinsi --",
                                "type": "dropdown",
                                "type_category": "field",
                                "order": 1,
                                "validation": {
                                    "required": true
                                },
                                "options": [],
                                "source": "provinces",
                                "depend_on": null
                            },
                            {
                                "id": "kota",
                                "label": "Kota",
                                "placeholder": "-- Pilih Kota --",
                                "type": "dropdown",
                                "type_category": "field",
                                "order": 1,
                                "validation": {
                                    "required": true
                                },
                                "options": [],
                                "source": "cities",
                                "depend_on": "provinsi"
                            },
                            {
                                "id": "alamat",
                                "label": "Alamat",
                                "placeholder": null,
                                "type": "textarea",
                                "type_category": "field",
                                "order": 1,
                                "validation": {},
                                "options": [],
                                "source": null,
                                "depend_on": null
                            }
                        ]
                    }

                ]
            }
        ]
    },
    {
        "id": 2,
        "title": "Formulir Approval Siswa Baru",
        "description": "Formulir ini digunakan untuk menyetujui pendaftaran siswa baru.",
        "components": [
            {
                "id": "nomor_pendaftaran",
                "label": "Nomor Pendaftaran",
                "placeholder": "Masukkan nomor pendaftaran",
                "type": "text",
                "type_category": "field",
                "order": 1,
                "validation": {
                    "required": true,
                    "max_length": 12,
                    "pattern": "^[0-9]+$"
                },
                "options": [],
                "source": null,
                "depend_on": null
            },
            {
                "id": "ruang_ujian",
                "label": "Ruang Ujian",
                "placeholder": "Masukkan ruangan ujian",
                "type": "text",
                "type_category": "field",
                "order": 1,
                "validation": {
                    "required": true, 
                    "pattern": "^[a-zA-Z ]+$"
                },
                "options": [],
                "source": null,
                "depend_on": null
            },
            {
                "id": "tanggal_ujian",
                "label": "Tanggal Ujian",
                "placeholder": "Masukkan tanggal ujian",
                "type": "date",
                "type_category": "field",
                "order": 1,
                "validation": {
                    "required": true, 
                    "format": ["YYYY-MM-DD"],
                    "min_date": "2023-01-01",
                    "max_date": "2023-12-31"
                },
                "options": [],
                "source": null,
                "depend_on": null
            }
        ]
    }
]
// .form_templates