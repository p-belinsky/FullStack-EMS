import {useState} from "react";
import {Loader2Icon, PlusIcon, X} from "lucide-react";

const GeneratePayslipForm = ({employees, onSuccess}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    if(!isOpen) return(
        <button className='btn-primary flex items-center gap-2' onClick={()=>setIsOpen(true)}>
            <PlusIcon className='w-4 h-4'/> Generate Payslip
        </button>
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

    }


    return (
        <div className='fixed inset-0 bg-black/40 p-4 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='card max-w-lg w-full p-6 animate-slide-up'>
                <div className='flex justify-between items-center mb-6'>
                    <h3 className='text-lg font-bold text-slate-900'>Generate Monthly Payslip</h3>
                    <button className='text-slate-400 hover:text-slate-600 p-1' onClick={()=>setIsOpen(false)}>
                        <X size={20}/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Employee</label>
                        <select name='employeeId' required>
                            {employees.map((emp)=>(
                                <option key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName} ({emp.position})</option>
                            ))}
                        </select>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Month</label>
                            <select>
                                {Array.from({length: 12}, (_, i) => i + 1).map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Year</label>
                            <input type='number' name='year' defaultValue={new Date().getFullYear()} min={2020} max={new Date().getFullYear()} />

                        </div>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Basic Salary</label>
                        <input type='number' name='basicSalary' required placeholder="5000" />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Allowances</label>
                            <input type='number' name='allowances' defaultValue='0' />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-slate-700 mb-2'>Deductions</label>
                            <input type='number' name='deductions' defaultValue='0' />
                        </div>
                    </div>

                    <div className='flex justify-end gap-3 pt-2'>
                        <button className='btn-secondary' type='button' onClick={()=>setIsOpen(false)}>
                            Cancel
                        </button>
                        <button className='btn-primary flex items-center' type='submit' disabled={isLoading}>
                            {isLoading && <Loader2Icon className='w-4 h-4 mr-2 animate-spin'/>}
                            Generate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default GeneratePayslipForm
