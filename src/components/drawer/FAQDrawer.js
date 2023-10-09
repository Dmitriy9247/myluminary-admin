import Scrollbars from "react-custom-scrollbars-2"
import Title from "../form/Title"
import Error from '../form/Error';
import useFAQSubmit from "../../hooks/useFAQSubmit"
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import { Textarea } from "@windmill/react-ui";
import DrawerButton from "../form/DrawerButton";

const FAQDrawer = ({ id }) => {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
    } = useFAQSubmit(id);
    return (
        <>
        <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {id ? (
            <Title
                title="Update FAQ"
                description="Updated your faq and necessary information from here"
            />
            ) : (
            <Title
                title="Add FAQ"
                description="Add your faq and necessary information from here"
            />
            )}
        </div>
        <Scrollbars className="w-full md:w-7/12 lg:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="block">
                <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 xl:pb-32">
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 mb-6">
                        <LabelArea label="Question"/>
                        <div className="col-span-8 sm:col-span-4">
                            <InputArea 
                                register={register}
                                label="FAQ Question"
                                name="question"
                                type="text"
                                placeholder="Question"
                            />
                            <Error errorName={errors.question} />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 mb-6">
                        <LabelArea label="Answer"/>
                        <div className="col-span-8 sm:col-span-4">
                            <Textarea
                                className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                                {
                                    ...register('answer', {
                                        required: 'Answer is required!',
                                        minLength: {
                                            value: 20,
                                            message: 'Minimum 20 character!',
                                        }
                                    })
                                }
                                name="answer"
                                type="text"
                                placeholder="Answer"
                            />
                            <Error errorName={errors.answer} />
                        </div>
                    </div>
                </div>

                <DrawerButton id={id} title={'FAQ'}/>
            </form>
        </Scrollbars>
        </>
    )
}

export default FAQDrawer