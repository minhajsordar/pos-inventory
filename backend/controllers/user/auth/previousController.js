import { isValidNumber } from '../../../utils/validationHelper.js';
import asyncHandler from '../../../middleware/asyncHandler.js';
import User from '../../../models/userModel.js';
import filehandler from '../../../utils/filehandler.js';
import generateToken from '../../../utils/generateToken.js';
import { Role, Permission } from '../../../models/permissionAndRoleModel.js';
import permissionSlugs from '../../../constants/permissionSlugs.js';
import { sentenceCase } from 'change-case';
const createSuperAndRolesUserIfNotExist = asyncHandler(async (req, res) => {
    console.log('generating permission rule');
    const existUser = await User.findOne({ email: 'minhaj@gmail.com' })

    const permissionSlugKeys = Object.keys(permissionSlugs);
    // await Permission.deleteMany();
    // await Role.deleteMany();
    const existingPermission = await Permission.find({});
    const existingPermissionSlugs = existingPermission.map((e) => e?.slug);
    const permissionsData = [];
    for (let i = 0; i < permissionSlugKeys.length; i++) {
        if (!existingPermissionSlugs.includes(`${permissionSlugKeys[i]}`)) {
            console.log(`${permissionSlugKeys[i]}`);
            console.log(existingPermissionSlugs.includes(`${permissionSlugKeys[i]}`));
            permissionsData.push({
                slug: permissionSlugKeys[i],
                name: sentenceCase(permissionSlugKeys[i]),
                description: 'Can ' + sentenceCase(permissionSlugKeys[i]),
            });
        }
    }
    const permissions =
        permissionsData.length !== 0
            ? await Permission.insertMany(permissionsData)
            : [];
    const userDetails = { email: 'minhaj@gmail.com', userName: "minhaj", password: 1234 }
    const user = {}
    const existingSuperAdminRole = await Role.findOne({ slug: 'superAdmin' });
    const allPermissions = await Permission.find({});
    if (existingSuperAdminRole) {
        existingSuperAdminRole.permissions = allPermissions.map((e) => e._id);
        user.roles = [existingSuperAdminRole._id];
    } else {
        const roles = await Role.create({
            slug: 'superAdmin',
            name: 'Super Admin',
            description: 'Super Admin Permission',
            permissions: allPermissions.map((e) => e._id),
        });
        user.roles = [roles._id];
    }
    const existingPublicRole = await Role.findOne({ slug: 'public' });
    if (!existingPublicRole) {
        const publicRole = await Role.create({
            slug: 'public',
            name: 'Public',
            description:
                'Public Access Permission, No need role or direct permission',
            permissions: [],
        });
    }
    user.permissions = [];
    if (existUser) {
        existUser.roles = user.roles
        existUser.permissions = user.permissions
        await existUser.save()
    } else {
        const usernew = await User.create({ ...userDetails, ...user });
    }

    res.json({
        userDetails,
        existingPublicRole,
        existingSuperAdminRole,
        existingPermissionSlugs,
        permissions
    });
});