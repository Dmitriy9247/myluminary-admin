import { useMutation } from "@apollo/client"
import { Select } from "@windmill/react-ui"
import { useState } from "react"
import { UPDATE_USER } from "../../graphql/mutation"
import { notifyError, notifySuccess } from "../../utils/toast"
import { errorCodes } from "@apollo/client/invariantErrorCodes"

const SelectRoles = ({id, role}) => {
    const [userRole, setUserRole] = useState(role ?? "customer")
    const [updateUser] = useMutation(UPDATE_USER)
    const changeRole = (userRole) => {
        const updatedData = {
            role: userRole
        }
        console.log(updatedData)
        updateUser({variables:{id:id, ...updatedData}}).then((res) => {
            setUserRole(userRole)
            notifySuccess("Successfully Updated!")
        }).catch((err) => notifyError(err.message))
    }
    return (
        <>
         <Select value={userRole} onChange={(e) => changeRole(e.target.value)}>
            <option value= "customer">Customer</option>
            <option value= "driver">Driver</option>
            <option value= "agency">Agency</option>
            <option value= "admin">Admin</option>
         </Select>
        </>
    )
}

export default SelectRoles