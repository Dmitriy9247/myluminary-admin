import { useLazyQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREATE_FAQ, UPDATE_FAQ } from "../graphql/mutation";
import { GET_FAQ } from "../graphql/query";
import { useContext } from "react";
import { notifyError, notifySuccess } from "../utils/toast";
import { useEffect } from "react";
import { SidebarContext } from "../context/SidebarContext";

const useFAQSubmit = (id) => {

    const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

    const[createFaq] = useMutation(CREATE_FAQ)
    const[updateFaq] = useMutation(UPDATE_FAQ)
    const[getFaq] = useLazyQuery(GET_FAQ)


    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const faqData = {
            question: data.question,
            answer: data.answer,
            faq_type: data.faq_type
        }

        if (id) {
            updateFaq({variables:{
                id,
                ...faqData
            }}).then((res) => {
                setIsUpdate(true);
                notifySuccess("Successfully Updated!")
                closeDrawer();
            }).catch((err) => notifyError(err.message));
        } else {
            createFaq({variables:{
                ...faqData
            }}).then((res) => {
                setIsUpdate(true);
                notifySuccess("Successfully Added!");
                closeDrawer();
            }).catch((err) => notifyError(err.message));
        }
    }

    useEffect(() => {
        if (!isDrawerOpen) {
            setValue('question');
            setValue('answer');
            setValue('faq_type');
            clearErrors('question');
            clearErrors('answer');
            clearErrors('faq_type');
            return;
        }
        if (id) {
            getFaq({variables:{id}})
            .then((res) => {
                if (res) {
                    const { data } = res
                    setValue('question', data.faq.question)
                    setValue('answer', data.faq.answer)
                    setValue('faq_type', data.faq.faq_type)
                }
            })
            .catch((err) => notifyError(err.message))
        }
    }, [id, setValue, isDrawerOpen])

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
    };
};

export default useFAQSubmit;