import { useState } from "react";
import type { Vendor } from "../../types";
import Cross from "../misc/Cross";
import Seperator from "../misc/Seperator";

type props = {
    vendors: Vendor[]
    vendorsFns: {
        addVendor: (name: string, cost: string) => void;
        removeVendor: (id: string) => void;
    }
}

export default function VendorsSection({vendors, vendorsFns}: props){
    const [vendorForm, setVendorForm] = useState({name: "", costPerDay: ""});

    const handleAddVendor = () => {
        vendorsFns.addVendor(vendorForm.name, vendorForm.costPerDay)
        setVendorForm({name: "", costPerDay: ""})
    }

    const handleRemoveVendor = (id: string) => {
        vendorsFns.removeVendor(id)
    }

    return (
        <div className="FestivalVendors">
            <div className="AddVendorsForm">
                <h3 className="ConfigTitle">Vendors</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleAddVendor()}}>
                    <input 
                        placeholder="Vendor Name (e.g. George)"
                        value={vendorForm.name}
                        onChange={(e) => {setVendorForm(prev => ({...prev, name: e.target.value}))}}
                    />
                    <input 
                        placeholder="Cost Per Day(e.g. £200)"
                        value={`${vendorForm.costPerDay}`}
                        onChange={(e) => {setVendorForm(prev => ({...prev, costPerDay: e.target.value}))}}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div className="VendorsCollection">
                {
                    vendors.map((vendor) => {
                        return (
                            <div className="PlannedVendors" key={vendor.id}>
                                <p>{vendor.name}</p>
                                <Seperator/>
                                <span>£{vendor.costPerDay}</span>
                                <button 
                                    className="DeleteVendor"
                                    onClick={() => {handleRemoveVendor(vendor.id)}}
                                    >
                                        <Cross/>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}