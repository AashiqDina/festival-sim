import { useState } from "react";
import type { Staff } from "../../types";
import Cross from "../misc/Cross";
import Seperator from "../misc/Seperator";

type props = {
    staff: Staff[];
    staffFns: {
        addStaff: (name: string, cost: string) => void;
        removeStaff: (id: string) => void;
    };
};

export default function StaffSection({ staff, staffFns }: props) {
    const [staffForm, setStaffForm] = useState({ name: "", cost: "" });

    const handleAddStaff = () => {
        staffFns.addStaff(staffForm.name, staffForm.cost);
        setStaffForm({name: "", cost: ""})
    };

    const handleRemoveStaff = (id: string) => {
        staffFns.removeStaff(id);
    };

    return (
        <div className="FestivalStaff">
            <div className="AddStaffForm">
                <h3 className="ConfigTitle">Staff</h3>

                <form onSubmit={(e) => { e.preventDefault(); handleAddStaff(); }}>
                    <input
                        placeholder="Staff Name (e.g. Security)"
                        value={staffForm.name}
                        onChange={(e) =>
                            setStaffForm(prev => ({ ...prev, name: e.target.value }))
                        }
                    />

                    <input
                        placeholder="Cost per day (e.g. £120)"
                        value={staffForm.cost}
                        onChange={(e) =>
                            setStaffForm(prev => ({ ...prev, cost: e.target.value }))
                        }
                    />

                    <button type="submit">Add</button>
                </form>
            </div>

            <div className="StaffCollection">
                {staff.map((member) => (
                    <div className="PlannedStaff" key={member.id}>
                        <p>{member.name}</p>
                        <Seperator/>
                        <span>£{member.costPerDay}/day</span>

                        <button
                            className="DeleteStaff"
                            onClick={() => handleRemoveStaff(member.id)}
                        >
                            <Cross/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}